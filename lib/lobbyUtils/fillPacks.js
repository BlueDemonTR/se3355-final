import pullFromRemaining from './pullFromRemaining'

async function fillPacks(lobby, io) {
  const packCount = lobby.attendants.length,
    packSize = lobby.packSize

  for (let i = 0; i < packCount; i++) {
    lobby.packs[i] = []

    const pack = lobby.packs[i]

    for (let j = 0; j < packSize; j++) {
      pack.push(await pullFromRemaining(lobby))
    }
  }

  for (const attendant of lobby.attendants) {
    attendant.draftingPack = (attendant.draftingPack + 1) % packCount
   
    if(attendant.active) continue

    io.to(attendant.account._id.toString())
      .emit('SET_PACKS', lobby.packs[attendant.draftingPack])
  }
}

export default fillPacks