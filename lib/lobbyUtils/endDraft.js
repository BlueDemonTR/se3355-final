import UpdateItem from "./UpdateItem"

async function endDraft(lobby, io) {
  const updateItem = new UpdateItem()

  updateItem.add(
    lobby,
    'status',
    'ended'
  )
  
  for (const attendant of lobby.attendants) {
    if(!attendant.active) continue

    io.to(attendant.account._id.toString()).emit('END_DRAFT')
  }
  
  return updateItem
}

export default endDraft 