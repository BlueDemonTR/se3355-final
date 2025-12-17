import getAttendantData from "./getAttendantData"

async function userEnter(lobby, user, io) {
  const oldAttendants = [...lobby.attendants]

  const newUser = { account: user, active: true, takenTurn: false }

  lobby.attendants.push(newUser)

  user.password = ''

  for (const attendant of oldAttendants) {
    if(!attendant.active) continue

    io.to(attendant.account._id.toString()).emit('LOBBY_JOIN', getAttendantData(newUser))
  }
}

export default userEnter