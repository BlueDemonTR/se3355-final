import fillPacks from './fillPacks'
import UpdateItem from './UpdateItem'

async function givePacks(lobby, io) {
  const updateItem = new UpdateItem()

  const packCount = lobby.attendants.length
  
  if(!lobby.packs[0]?.length) {
    updateItem.combine(
      await fillPacks(lobby, io)
    )
  }

  for (const attendant of lobby.attendants) {
    attendant.draftingPack = (attendant.draftingPack + 1) % packCount
   
    if(!attendant.active) continue
    
    io.to(attendant.account._id.toString())
      .emit('SET_PACKS', lobby.packs[attendant.draftingPack])
  }
  
  for (let i = 0; i < lobby.attendants.length; i++) {
    updateItem.add(
      lobby,
      `attendants.${i}.takenTurn`,
      false
    )
    updateItem.add(
      lobby,
      `attendants.${i}.draftingPack`,
      lobby.attendants[i].draftingPack
    )
  }

  return updateItem 
}

export default givePacks