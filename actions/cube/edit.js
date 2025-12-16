import { Authority } from '../../lib'
import { Cube } from '../../models'

const docs = {
  method: 'post',
  action,
  description: 'Edits the given cube',
  authorized: Authority.USER
}

async function action(req, res) {
  const { name, cards, id } = req.body,
    { user } = req

  const cube = await Cube.findById(id)

  if(user._id.toString() !== cube?.owner.toString()) return res.end()

  await cube.updateOne({
    name,
    cards
  })

  res.send(cube._id)
}

export default docs
