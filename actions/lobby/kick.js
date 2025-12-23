import { Authority } from '../../lib'
import { inRoom, UpdateItem, userLeave } from '../../lib/lobbyUtils'
import { Lobby } from '../../models'

const docs = {
  method: 'post',
  action,
  description: 'Removes a player from the lobby if it is the owner, closes down the lobby',
  authorized: Authority.USER
}

async function action(req, res) {
  const { lobbyId, userId } = req.body,
    { user } = req,
    { io } = req.app

  const lobby = await Lobby
    .findOne({ _id: lobbyId, owner: user._id })
    .populate('attendants.account', 'username')
  if(!lobby) return res.sendStatus(200)

  if(!inRoom(lobby, userId)) return res.sendStatus(200)

  io.to(userId).emit('LOBBY_KICKED')

  const updates = await userLeave(lobby, { _id: userId }, io)

  await UpdateItem.applyUpdates(updates)
  
  res.sendStatus(200)
}

export default docs
