import getAttendantData from "./getAttendantData"

async function getClientData(lobby, userId) {
  const lobbyUser = lobby
    .attendants
    .find(x => x.account._id.toString() === userId.toString())

  if(!lobbyUser) return null

  return {
    _id: lobby._id,
    owner: lobby.owner._id ?? lobby.owner,
    attendants: lobby.attendants.map(getAttendantData),
    drafted: lobbyUser.drafted,
    takenTurn: lobbyUser.takenTurn,
    currentPack: lobby.packs[lobbyUser.draftingPack],
    draftSize: lobby.draftSize,
    maxLobbySize: lobby.maxLobbySize,
    status: lobby.status,
    public: lobby.public,
    cardData: lobby.cardData
  }
}

export default getClientData