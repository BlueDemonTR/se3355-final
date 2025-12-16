import { Authority } from '../../lib'
import { Cube } from '../../models'

const docs = {
  method: 'post',
  action,
  description: 'Saves the given cube',
  authorized: Authority.USER
}

async function action(req, res) {
  const { name, cards } = req.body,
    { user } = req

  const cube = await Cube.create({
    name,
    cards,
    owner: user
  })

  res.send(cube._id)
}

export default docs
