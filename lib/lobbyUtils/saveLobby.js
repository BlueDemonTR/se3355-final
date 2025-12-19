async function saveLobby(updateMap = new Map()) {
  const entries = [...updateMap.entries()]

  const map = new Map()
  
  for (const [item, update] of entries) {
    map.set(
      item,
      await item.updateOne(update, { new: true })
    )
  }

  return map
}

export default saveLobby