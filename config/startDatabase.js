import mongoose from 'mongoose'
import env from '.'

async function startDatabase() {
  await mongoose.connect(env.DB_URI, {})
}

export default startDatabase
