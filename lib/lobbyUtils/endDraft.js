async function endDraft(lobby, io) {
  lobby.status = 'ended'

  
  for (const attendant of lobby.attendants) {
    if(!attendant.active) continue

    io.to(attendant.account._id.toString()).emit('END_DRAFT')
  }
  
}

export default endDraft 