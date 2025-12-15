import {  } from '../models'

const docs = {
  method: 'get',
  action,
  description: 'Sends back whatever the client sends',
  authorized: false
}

async function action(req, res) {
  res.send(req.query?.message)
}

export default docs
