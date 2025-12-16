import { Schema, model } from 'mongoose'

const CubeSchema = new Schema({
  name: String,
  cards: {
    type: [{
      id: Number,
      count: Number
    }],
    default: []
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  playCount: {
    type: Number,
    default: 0
  }
})

const Cube = model('Cube', CubeSchema)

export default Cube
