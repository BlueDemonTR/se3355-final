import { Router } from 'express'
import getRoutes from '../actions'

const router = Router()

const middleware = (req, res, next) => { next() }

async function indexRouter() {
  const routes = await getRoutes()

  routes.forEach((val, key) => {
    const { method, action, authorized } = require(val).default
    
    router[method](key, middleware, action)
    console.log(method, key)
  })
  

  return router
}

export default indexRouter