import getCards from "../../services/getCards"
import shuffleArray from "../shuffleArray"
import fillPacks from "./fillPacks"
import givePacks from "./givePacks"

async function startLobby(lobby, user, io) {
  lobby.status = 'drafting'

  await lobby.populate('cube')

  lobby.cubeContent = []

  lobby.cardData = await getCards(lobby.cube.cards)

  for (const { id, count } of lobby.cube.cards) {
    for (let i = 0; i < count; i++) {
      lobby.cubeContent.push(id)
    }
  }

  shuffleArray(lobby.attendants)
  
  for (let index = 0; index < lobby.attendants.length; index++) {
    const attendant = lobby.attendants[index]
    attendant.draftingPack = index

    io.to(attendant.account._id.toString()).emit('SET_CARD_DATA', lobby.cardData)
  }

  const packCount = lobby.attendants.length

  for (let i = 0; i < packCount; i++) {
    lobby.packs[i] = []
  }

  await givePacks(lobby, io)
}

export default startLobby