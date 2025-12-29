function inRoom(room, userId) {
  console.log(room.attendants);
  
  return room.attendants.find(x => x.account._id.toString() === userId.toString())
}

export default inRoom