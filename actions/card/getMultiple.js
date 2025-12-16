import { Authority } from '../../lib'
import { getCards } from '../../services'

const docs = {
  method: 'post',
  action,
  description: 'Pulls multiple cards',
  authorized: Authority.NONE
}

async function action(req, res) {
  const { cards } = req.body

  console.log(cards)
  

  res.send(await getCards(cards))
}

export default docs
