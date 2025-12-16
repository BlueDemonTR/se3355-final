function getImage(id) {
  return `${process.env.REACT_APP_API_URL}/static/images/${id}.jpg`
}

export default getImage