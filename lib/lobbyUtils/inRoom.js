function inRoom(room, userId) {
  return room.attendants.find(x => x.account._id.toString() === userId.toString())
}

export default inRoom