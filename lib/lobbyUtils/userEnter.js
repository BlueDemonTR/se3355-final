import getAttendantData from "./getAttendantData"
import UpdateItem from "./UpdateItem"

async function userEnter(lobby, user, io) {
  const newUser = { account: user, active: true, takenTurn: false }

  const updates = new UpdateItem()

  updates.add(
    lobby,
    'attendants',
    newUser,
    '$push'
  )

  for (const attendant of lobby.attendants) {
    if(!attendant.active) continue

    io.to(attendant.account._id.toString()).emit('LOBBY_JOIN', getAttendantData(newUser))
  }

  return updates
}

export default userEnter