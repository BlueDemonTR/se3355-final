import { Lobby } from '../../models'
import endDraft from './endDraft'
import givePacks from './givePacks'
import UpdateItem from './UpdateItem'

const lobbyLocks = new Set()

async function checkForNewTurn(lobbyId, io) {
  const lobby = await Lobby.findById(lobbyId)
  
  let everyoneDone = !lobby.attendants.find(x => x.active && !x.takenTurn)

  if(everyoneDone && !lobbyLocks.has(lobbyId)) {
    console.log('STARTING NEXT TURN')

    lobbyLocks.add(lobbyId)
    const updateItem = new UpdateItem()
    
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