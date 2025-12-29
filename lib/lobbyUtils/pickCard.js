import endDraft from './endDraft'
import givePacks from './givePacks'
import inRoom from './inRoom'
import UpdateItem from './UpdateItem'

async function pickCard(lobby, userId, cardId, io) {
  const lobbyUser = await inRoom(lobby, userId),
    lobbyUserIdx = lobby.attendants.indexOf(lobbyUser)

  const updateItem = new UpdateItem()

  updateItem.add(
    lobby,
    `attendants.${lobbyUserIdx}.takenTurn`,
    true
  )

  console.log(lobbyUser, userId);
  

  const packIdx = lobbyUser.draftingPack,
    pack = [...lobby.packs[lobbyUser.draftingPack]],
    cardIdx = pack.findIndex(x => x === cardId)

  const card = pack[cardIdx]
  pack.splice(cardIdx, 1)

  updateItem.add(
    lobby,
    `attendants.${lobbyUserIdx}.drafted`,
    card,
    '$push'
  )

  updateItem.add(
    lobby,
    `packs.${packIdx}`,
    pack
  )

  for (const attendant of lobby.attendants) {
    if(!attendant.active) continue

    const attendantId = attendant.account._id.toString()

    if(attendantId !== userId.toString())
      io.to(attendantId).emit('ATTENDANT_TAKEN_TURN', userId)
  }

  return updateItem
}

export default pickCard