import { Authority } from '../../lib'
import { getClientData, userEnter } from '../../lib/lobbyUtils'
import { Lobby } from '../../models'

const docs = {
  method: 'post',
  action,
  description: 'Attempts to join a user into a public room',
  authorized: Authority.USER
}

async function action(req, res) {
  const { lobbyId } = req.body,
    { user } = req,
    { io } = req.app

  const lobby = await Lobby
    .findById(lobbyId)
    .populate('attendants.account', 'username')

  if(!lobby.public) return res.end()
  if(lobby.status !== 'waiting') return res.end()
  
  if(lobby.attendants.length >= lobby.maxLobbySize) return res.end()

  await userEnter(lobby, user, io)

  await lobby.save()

  res.send(await getClientData(lobby, user._id))
}

export default docs
