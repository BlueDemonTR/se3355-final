import { Api, Authority } from '../../lib'
import { Cube } from '../../models'
import { getCards } from '../../services'

const docs = {
  method: 'delete',
  action,
  description: 'Deletes a cube with the given id',
  authorized: Authority.USER
}

async function action(req, res) {
  const { id } = req.query,
    { user } = req

  const cube = await Cube.findById(id)

  if(user._id.toString() !== cube?.owner.toString()) return res.end()

  await cube.deleteOne()

  res.send()
}

export default docs
