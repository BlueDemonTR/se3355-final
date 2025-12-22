import { Authority } from '../../lib'
import { startLobby, UpdateItem } from '../../lib/lobbyUtils'
import { Lobby } from '../../models'

const docs = {
  method: 'post',
  action,
  description: 'Starts the given draft',
  authorized: Authority.USER
}

async function action(req, res) {
  const { lobbyId } = req.body,
    { user } = req,
    { io } = req.app

  const lobby = await Lobby.findById(lobbyId)
  if(!lobby) return res.end()
    
  if(lobby.owner.toString() !== user._id.toString()) return res.end()

  const updates = await startLobby(lobby, user, io)

  await UpdateItem.applyUpdates(updates)

  res.sendStatus(200)
}

export default docs
