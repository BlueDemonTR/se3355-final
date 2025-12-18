import endDraft from './endDraft'
import givePacks from './givePacks'
import inRoom from './inRoom'

async function pickCard(lobby, userId, cardId, io) {
  const lobbyUser = await inRoom(lobby, userId)

  lobbyUser.takenTurn = true

  const pack = lobby.packs[lobbyUser.draftingPack],
    cardIdx = pack.findIndex(x => x === cardId)

  const card = pack[cardIdx]
  pack.splice(cardIdx, 1)

  lobbyUser.drafted.push(card)

  let everyoneDone = true
  for (const attendant of lobby.attendants) {
    if(!attendant.active) continue

    if(!attendant.takenTurn) everyoneDone = false
    const attendantId = attendant.account._id.toString()

    if(attendantId !== userId.toString())
      io.to(attendant.account._id.toString()).emit('ATTENDANT_TAKEN_TURN', userId)
  }

  if(everyoneDone) {
    if(lobbyUser.drafted.length >= lobby.draftSize) return await endDraft(lobby, io)

    await givePacks(lobby, io)
  }
}

export default pickCard