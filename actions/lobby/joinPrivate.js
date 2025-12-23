import { Authority } from '../../lib'
import { getClientData, UpdateItem, userEnter } from '../../lib/lobbyUtils'
import { Lobby } from '../../models'

const docs = {
  method: 'post',
  action,
  description: 'Attempts to join a user into a private room',
  authorized: Authority.USER
}

async function action(req, res) {
  const { lobbyId, password } = req.body,
    { user } = req,
    { io } = req.app

  const lobby = await Lobby
    .findById(lobbyId)
    .populate('attendants.account', 'username')

  if(!lobby.public && lobby.passcode !== password) return res.end()
  if(lobby.status !== 'waiting') return res.end()
  
  if(lobby.attendants.length >= lobby.maxLobbySize) return res.end()

  const updates = await userEnter(lobby, user, io)

  await UpdateItem.applyUpdates(updates)

  const newLobby = await Lobby
    .findById(lobbyId)
    .populate('attendants.account', 'username')

  res.send(await getClientData(newLobby, user._id))
}

export default docs
