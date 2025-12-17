import { sign } from 'jsonwebtoken'
import { User } from '../../models'
import env from '../../config'
import { Authority } from '../../lib'

const docs = {
  method: 'post',
  action,
  description: 'Sends back whatever the client sends',
  authorized: Authority.NONE
}

async function action(req, res) {
  const { username, password } = req.body

  const exists = await User.findOne({ username })
  if(exists) {
    res.status(400).send('Username taken.')
    return
  }

  
  const newUser = new User({ 
    username
  })

  newUser.password = newUser.generateHash(password)

  await newUser.save()

  newUser.password = ''

  const tokenData = { id: newUser._id }

  const token = sign(tokenData, env.JWT_SECRET, { expiresIn: '14d' })

  res.send({ user: newUser, token })
}

export default docs
