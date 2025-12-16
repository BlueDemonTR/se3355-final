import { Api, Authority } from '../../lib'

const docs = {
  method: 'get',
  action,
  description: 'Searches cards with the notified text and returns it, no pagination',
  authorized: Authority.NONE
}

async function action(req, res) {
  const { name = '' } = req.query

  if (name.length < 3) return res.end()

  const _res = await Api.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', { fname: name })
  if(!_res) return res.end()

  res.send(_res.data)
}

export default docs
