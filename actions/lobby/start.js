import { Authority } from '../../lib'
import { startLobby } from '../../lib/lobbyUtils'
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

  await startLobby(lobby, user, io)

  await lobby.save()

  res.sendStatus(200)
}

export default docs
