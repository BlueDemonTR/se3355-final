import { Authority } from '../../lib'
import { checkForNewTurn, getClientData, inRoom, pickCard, UpdateItem, userEnter } from '../../lib/lobbyUtils'
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

  const updates = await pickCard(lobby, user._id, cardId, io)

  await UpdateItem.applyUpdates(updates)

  res.sendStatus(200)

  setTimeout(() => checkForNewTurn(lobby._id.toString(), io), 500)
}

export default docs
