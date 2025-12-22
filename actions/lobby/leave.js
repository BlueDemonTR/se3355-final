import { Authority } from '../../lib'
import { UpdateItem, userLeave } from '../../lib/lobbyUtils'
import { Lobby } from '../../models'

const docs = {
  method: 'get',
  action,
  description: 'Removes a player from the lobby if it is the owner, closes down the lobby',
  authorized: Authority.USER
}

async function action(req, res) {
  const { id } = req.query,
    { user } = req,
    { io } = req.app

  const lobby = await Lobby.findById(id)
  if(!lobby) return res.sendStatus(200)

  const updates = await userLeave(lobby, user, io)

  await UpdateItem.applyUpdates(updates)
  
  res.sendStatus(200)
}

export default docs
