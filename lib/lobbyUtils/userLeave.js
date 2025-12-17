async function userLeave(lobby, user, io) {

  if(lobby.status === 'waiting') lobby.attendants = lobby
    .attendants
    .filter(x => x.account._id.toString() !== user._id.toString())
  
  if(lobby.status === 'drafting') lobby
    .attendants
    .find(x => x.account._id.toString() === user._id.toString())
    ?.active === false
  
  if(user._id.toString() === lobby.owner._id.toString()) lobby.status = 'ended'

  for (const attendant of lobby.attendants) {
    if(!attendant.active) continue

    io.to(attendant.account._id.toString()).emit('LOBBY_LEAVE', user._id.toString())
  }
}

export default userLeave