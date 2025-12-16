import { Api } from '../lib'

async function getCards(cards) {
  const ids = cards.map(x => x.id ?? x).join(',')

  if(!ids.length) return {}

  const res = await Api.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${ids}`)
  if(!res) return {}

  return res.data.reduce((prev, curr) => {
    prev[curr.id] = curr
    
    return prev
  }, {})
}

export default getCards