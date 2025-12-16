import { Authority } from '../../lib'
import { Cube } from '../../models'

const docs = {
  method: 'get',
  action,
  description: 'Gets the top 8 cubes, sorted by playcount',
  authorized: Authority.NONE
}

async function action(req, res) {
  const cubes = await Cube
    .find({ })
    .sort('-playCount')
    .limit(8)

  res.send(cubes)
}

export default docs
