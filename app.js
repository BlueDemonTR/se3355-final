import express, { Router } from 'express'
import http from 'http'
import https from 'https'
import cors from 'cors'
import bodyParser from 'body-parser'
import env, { startDatabase } from './config'
import { init } from './services'
import { ioConfig } from './lib'
import indexRouter from './routes'
import { Server } from 'socket.io'
import funcCreator from './lib/funcCreator'
import { readFileSync } from 'fs'

const app = express()

const corsSettings = {
  origin: function (origin, callback) {
    callback(null, true)
  }
}

app.use(cors(corsSettings))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/static', express.static('public'))

app.functions = funcCreator()

indexRouter().then(x => app.use(x))

const server = http.createServer(app)

let httpsServer
if(process.env.ENV !== 'dev') {
  const key = readFileSync('/etc/ssl/private/apache-selfsigned.key')
  const cert = readFileSync('/etc/ssl/certs/apache-selfsigned.crt')
  
  const options = { key, cert }

  httpsServer = https.createServer(options, app)

  httpsServer.listen(env.HTTPS_PORT, () => {
    console.log(`Node.js HTTPS server is running on port ${env.HTTPS_PORT}`)
  })
}

const io = new Server(httpsServer ?? server, { cors: corsSettings })

ioConfig(io, app.functions)

app.io = io

server.listen(env.HTTP_PORT, () => {
  console.log(`Node.js HTTP server is running on port ${env.HTTP_PORT}`)

  startDatabase().then(() => console.log('Database up'))

  init(io)
})

const quitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT']
  
quitSignals.forEach(signal => process.on(signal, () => {
  server.close()
  if(process.env.ENV !== 'dev') {
    httpsServer.close()
  }

  console.log('CLOSED SERVERS')
  
  process.exit()
}))