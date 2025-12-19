import getAttendantData from "./getAttendantData"

async function userEnter(lobby, updates, user, io) {
  const newUser = { account: user, active: true, takenTurn: false }

  updates.set(
    lobby,
    { $push: {
      attendants: newUser
    }}
  )

  for (const attendant of lobby.attendants) {
    if(!attendant.active) continue

    io.to(attendant.account._id.toString()).emit('LOBBY_JOIN', getAttendantData(newUser))
  }
}

export default userEnter