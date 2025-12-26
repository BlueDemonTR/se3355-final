import { Router } from 'express'
import getRoutes from '../actions'
import env from '../config'
import { User } from '../models'
import { Authority } from '../lib'
import { verify } from 'jsonwebtoken'

const router = Router()

const notAuthorized = (req, res, next) => { 
  next()
}

const userAuthorized = async (req, res, next) => {
  let id
  if(req?.headers?.authorization) {
		try {
      const token = req.headers.authorization.slice(7)

			id = verify(
				token, 
				env.JWT_SECRET
			).id
		} catch (error) {
      res.status(401)
			res.write('Token Expired')
			
			res.end()
			return
		}
	}

  const exists = await User.findById(id)
  if(!exists) {
    res.status(401)
    res.write('Token Expired')
    
    res.end()
    return
  }

  req.user = exists

  next()
}

const adminAuthorized = async (req, res, next) => {
  let id
  if(req?.headers?.authorization) {
		try {
      const token = req.headers.authorization.slice(7)

			id = verify(
				token, 
				env.JWT_SECRET
			).id
		} catch (error) {
      res.status(401)
			res.write('Token Expired')
			
			res.end()
			return
		}
	}

  const exists = await User.findById(id)
  if(!exists || !exists.isAdmin) {
    res.status(401)
    res.write('Token Expired')
    
    res.end()
    return
  }

  req.user = exists

  next()
}

const middlewares = {
  [Authority.NONE]: notAuthorized,
  [Authority.USER]: userAuthorized,
  [Authority.ADMIN]: adminAuthorized
}

async function indexRouter() {
  const routes = await getRoutes()

  routes.forEach((val, key) => {
    const { method, action, authorized } = require(val).default

    router[method](key.replaceAll('\\', '/'), middlewares[authorized], action)
  })
  

  return router
}

export default indexRouter