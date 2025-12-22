import pullFromRemaining from './pullFromRemaining'
import UpdateItem from './UpdateItem'

async function fillPacks(lobby) {
  const packCount = lobby.attendants.length,
    packSize = lobby.packSize

  const updateItem = new UpdateItem() 

  for (let i = 0; i < packCount; i++) {
    const pack = []

    for (let j = 0; j < packSize; j++) {
      const [card, remainingCards] = await pullFromRemaining(lobby)

      lobby.remainingCards = remainingCards

      pack.push(card)
    }

    updateItem.add(
      lobby,
      `packs.${i}`,
      pack
    )
    lobby.packs[i] = pack
  }

  updateItem.add(
    lobby,
    'remainingCards',
    lobby.remainingCards
  )

  return updateItem
}

export default fillPacks