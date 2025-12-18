import fillPacks from './fillPacks'

async function givePacks(lobby, io) {
  const packCount = lobby.attendants.length
  
  if(!lobby.packs[0]?.length) {
    await fillPacks(lobby, io)
  }

  for (const attendant of lobby.attendants) {
    attendant.draftingPack = (attendant.draftingPack + 1) % packCount
   
    if(!attendant.active) continue
    
    attendant.takenTurn = false

    io.to(attendant.account._id.toString())
      .emit('SET_PACKS', lobby.packs[attendant.draftingPack])
  }
}

export default givePacks