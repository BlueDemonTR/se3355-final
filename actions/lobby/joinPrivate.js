import { Authority } from '../../lib'
import { userEnter } from '../../lib/lobbyUtils'
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

  const updates = new Map()

  await userEnter(lobby, updates, user, io)

  await lobby.updateOne(changes, { new: true })

  res.send(await getClientData(lobby, user._id))
}

export default docs
