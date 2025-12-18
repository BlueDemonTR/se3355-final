import pullFromRemaining from './pullFromRemaining'

async function fillPacks(lobby) {
  const packCount = lobby.attendants.length,
    packSize = lobby.packSize

  for (let i = 0; i < packCount; i++) {
    const pack = lobby.packs[i]

    for (let j = 0; j < packSize; j++) {
      pack.push(await pullFromRemaining(lobby))
    }
  }
}

export default fillPacks