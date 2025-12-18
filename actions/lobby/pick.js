import { Authority } from '../../lib'
import { getClientData, inRoom, pickCard, userEnter } from '../../lib/lobbyUtils'
import { Lobby } from '../../models'

const docs = {
  method: 'post',
  action,
  description: 'Attempts to join a user into a public room',
  authorized: Authority.USER
}

async function action(req, res) {
  const { lobbyId, cardId } = req.body,
    { user } = req,
    { io } = req.app

  const lobby = await Lobby
    .findById(lobbyId)
    .populate('attendants.account', 'username')

  const roomUser = inRoom(lobby, user._id)

  if(!roomUser) return res.end()
  if(roomUser.takenTurn) return res.end()

  await pickCard(lobby, user._id, cardId, io)

  // TODO: handle race conditions
  await lobby.save()

  res.sendStatus(200)
}

export default docs
