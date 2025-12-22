import UpdateItem from "./UpdateItem"

async function userLeave(lobby, user, io) {
  const updates = new UpdateItem()

  if(lobby.status === 'waiting') {
    updates.add(
      lobby, 
      'attendants',
      { account: user._id.toString() },
      '$pull'
    )
  }
  
  if(lobby.status === 'drafting') {
    updates.add(
      lobby
        .attendants
        .find(x => x.account._id.toString() === user._id.toString()),
      'active',
      false
    )
  }
  
  if(user._id.toString() === lobby.owner._id.toString()) {
    updates.add(
      lobby,
      'status',
      'ended'
    )

    for (const attendant of lobby.attendants) {
      updates.add(
        attendant,
        'active',
        'false'
      )
    }
  }

  for (const attendant of lobby.attendants) {
    if(!attendant.active) continue

    io.to(attendant.account._id.toString()).emit('LOBBY_LEAVE', user._id.toString())
  }

  return updates
}

export default userLeave