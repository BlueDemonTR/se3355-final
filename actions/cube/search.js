import { Api, Authority, escapeString } from '../../lib'
import { Cube } from '../../models'

const docs = {
  method: 'get',
  action,
  description: 'Searches cubes with the given text and returns it, no pagination',
  authorized: Authority.NONE
}

async function action(req, res) {
  const { name = '' } = req.query

  if (name.length < 3) return res.end()

  const cubes = await Cube
    .find({ name: new RegExp(escapeString(name), 'i') })
    .sort('-playCount')

  res.send(cubes)
}

export default docs
