import express, { Router } from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import env, { startDatabase } from './config'
import { init } from './services'
import indexRouter from './routes'

const app = express()

let origin = [
  'http://localhost:3000',
  'http://localhost:31748',
]

app.use(cors({ origin }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/static', express.static('public'))

indexRouter().then(x => app.use(x))

const server = http.createServer(app)

server.listen(env.HTTP_PORT, () => {
  console.log(`Node.js HTTP server is running on port ${env.HTTP_PORT}`)

  startDatabase().then(() => console.log('Database up'))

  init()
})
