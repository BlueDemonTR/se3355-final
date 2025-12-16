import { Api, Authority } from '../../lib'
import { Cube } from '../../models'
import { getCards } from '../../services'

const docs = {
  method: 'get',
  action,
  description: 'Gets the cube with the given id',
  authorized: Authority.NONE
}

async function action(req, res) {
  const { id } = req.query

  const item = await Cube.findById(id)
  if(!item) return res.end()

  const cards = await getCards(item.cards)

  const mappedCards = []

  for (const { id, count } of item.cards) {
    for (let i = 0; i < count; i++) {
      mappedCards.push(cards[id])
    }
  }

  item.cards = mappedCards

  res.send({
    ...(item.toObject()),
    cards: mappedCards
  })
}

export default docs
