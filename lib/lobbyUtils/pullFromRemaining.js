import shuffleArray from "../shuffleArray"

async function pullFromRemaining(lobby) {
  if(lobby.remainingCards.length == 0) {
    lobby.remainingCards = [...lobby.cubeContent]

    shuffleArray(lobby.remainingCards)
  }

  return lobby.remainingCards.pop()
}

export default pullFromRemaining