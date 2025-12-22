import getCards from "../../services/getCards"
import shuffleArray from "../shuffleArray"
import fillPacks from "./fillPacks"
import givePacks from "./givePacks"
import UpdateItem from "./UpdateItem"

async function startLobby(lobby, user, io) {
  const updateItem = new UpdateItem()

  updateItem.add(
    lobby, 
    'status',
    'drafting'
  )

  await lobby.populate('cube')

  const cubeContent = []

  const cardData = await getCards(lobby.cube.cards)

  updateItem.add(
    lobby,
    'cardData',
    cardData
  )

  for (const { id, count } of lobby.cube.cards) {
    for (let i = 0; i < count; i++) {
      cubeContent.push(id)
    }
  }

  updateItem.add(
    lobby,
    'cubeContent',
    cubeContent
  )

  const attendants = [...lobby.attendants]
  shuffleArray(attendants)
  
  for (let index = 0; index < attendants.length; index++) {
    const attendant = attendants[index]
    
    attendant.draftingPack = index
    
    io.to(attendant.account._id.toString()).emit('SET_CARD_DATA', cardData)
  }

  const packCount = lobby.attendants.length

  for (let i = 0; i < packCount; i++) {
    updateItem.add(
      lobby,
      `attendants.${i}.draftingPack`,
      lobby.attendants[i].draftingPack
    )

    lobby.packs[i] = []
  }

  const givePackUpdates = await givePacks(lobby, io)

  updateItem.combine(givePackUpdates)

  return updateItem
}

export default startLobby