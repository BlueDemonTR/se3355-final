import { Authority } from '../../lib'

const docs = {
  method: 'get',
  action,
  description: 'Sends back the yugioh card database with pagination, cached at the start',
  authorized: Authority.NONE
}

async function action(req, res) {
  const { skip: _skip = 0, count: _count = 40 } = req.query

  const skip = parseInt(_skip),
    count = parseInt(_count)

  const skipped = global.cardDatabase.slice(skip, skip + count)

  res.send({
    data: skipped,
    endReached: global.cardDatabase.length <= skip + count
  })
}

export default docs
