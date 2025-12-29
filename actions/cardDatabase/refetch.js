import { Api, Authority } from '../../lib'
import init from '../../services/init'

const docs = {
  method: 'get',
  action,
  description: 'Fetches the card database again',
  authorized: Authority.ADMIN
}

async function action(req, res) {
  await init(req.app.io)
  
  res.sendStatus(200)
}

export default docs
