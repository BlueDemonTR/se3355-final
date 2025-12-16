import { Authority } from '../../lib'
import { getCard, getCards } from '../../services'

const docs = {
  method: 'get',
  action,
  description: 'Pulls one card',
  authorized: Authority.NONE
}

async function action(req, res) {
  const { id } = req.query

  res.send(await getCard(id))
}

export default docs
