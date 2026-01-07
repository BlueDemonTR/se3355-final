import { Lobby } from '../../models'
import endDraft from './endDraft'
import givePacks from './givePacks'
import pickCard from './pickCard'
import UpdateItem from './UpdateItem'

const lobbyLocks = new Set()

async function checkForNewTurn(lobbyId, io) {
  const lobby = await Lobby
    .findById(lobbyId)
    .populate('attendants.account', 'username')

  if(lobby.status !== 'drafting') return

  let everyoneDone = !lobby.attendants.find(x => x.active && !x.takenTurn)

  if(everyoneDone && !lobbyLocks.has(lobbyId)) {
    lobbyLocks.add(lobbyId)
    const updateItem = new UpdateItem()
    
    // PICK CARDS FOR INACTIVE PLAYERS
    for (const x of lobby.attendants) {
      if(x.active) continue

      const pack = lobby.packs[x.draftingPack]

      const card = pack[Math.floor(Math.random() * pack.length)]

      updateItem.combine(
        await pickCard(lobby, x.account._id.toString(), card, io)
      )
    }

    if(lobby.attendants[0].drafted.length >= lobby.draftSize) {
      updateItem.combine(
        await endDraft(lobby, io)
      )
    } else {
      updateItem.combine(
        await givePacks(lobby, io)
      )
    }
    
    await UpdateItem.applyUpdates(updateItem)

    lobbyLocks.delete(lobbyId)
  }
}

export default checkForNewTurn