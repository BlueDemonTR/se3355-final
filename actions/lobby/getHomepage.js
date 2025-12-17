import { Authority } from '../../lib'
import { Lobby } from '../../models'

const docs = {
  method: 'get',
  action,
  description: 'Gets public lobbies',
  authorized: Authority.NONE
}

async function action(req, res) {
  const lobbies = await Lobby.find({ public: true, status: 'waiting' })
  
  res.send(lobbies)
}

export default docs