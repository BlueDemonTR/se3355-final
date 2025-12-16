import { Authority } from '../../lib'

const docs = {
  method: 'get',
  action,
  description: 'Sends back whatever the client sends',
  authorized: Authority.NONE
}

async function action(req, res) {
  res.send(req.query?.message)
}

export default docs
