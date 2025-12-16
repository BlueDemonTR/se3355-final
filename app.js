import express, { Router } from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import env, { startDatabase } from './config'
import { init } from './services'
import { ioConfig } from './lib'
import indexRouter from './routes'
import { Server } from 'socket.io'
import funcCreator from './lib/funcCreator'

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

server.listen(env.HTTP_PORT, () => {
  console.log(`Node.js HTTP server is running on port ${env.HTTP_PORT}`)

  startDatabase().then(() => console.log('Database up'))

  init()
})

const io = new Server(server, { cors: corsSettings })

ioConfig(io, app.functions)

app.io = io