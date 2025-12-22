import shuffleArray from "../shuffleArray"
import UpdateItem from "./UpdateItem"

async function pullFromRemaining(lobby) {
  
  let cards = [...lobby.remainingCards]
  
  if(cards.length == 0) {
    cards = [...lobby.cubeContent]
    shuffleArray(cards)
  }

  const card = cards.pop()

  return [card, cards]
}

export default pullFromRemaining