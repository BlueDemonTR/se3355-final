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
    const idx = lobby
      .attendants
      .findIndex(x => x.account._id.toString() === user._id.toString())

    updates.add(
      lobby,
      `attendants.${idx}.active`,
      false
    )
  }
  
  if(user._id.toString() === lobby.owner._id.toString()) {
    updates.add(
      lobby,
      'status',
      'ended'
    )

    for (let i = 0; i < lobby.attendants.length; i++) {
      updates.add(
        lobby,
        `attendants.${i}.active`,
        false
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