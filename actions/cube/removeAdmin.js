import { Api, Authority } from '../../lib'
import { Cube } from '../../models'
import { getCards } from '../../services'

const docs = {
  method: 'delete',
  action,
  description: 'Deletes a cube with the given id without needing to be the owner of it',
  authorized: Authority.ADMIN
}

async function action(req, res) {
  const { id } = req.query

  const cube = await Cube.findById(id)

  await cube.deleteOne()

  res.send()
}

export default docs
