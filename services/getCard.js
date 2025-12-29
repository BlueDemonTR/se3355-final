import { Api, simplifyCardData } from '../lib'

async function getCard(id) {
  const res = await Api.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
  if(!res) return {}

  return simplifyCardData(res.data[0])
}

export default getCard