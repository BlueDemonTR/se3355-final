function getAttendantData(attendant) {
  return ({ 
    _id: attendant.account._id, 
    username: attendant.account.username,
    active: attendant.active,
    takenTurn: attendant.takenTurn
  })
}

export default getAttendantData