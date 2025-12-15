import { Schema, model } from 'mongoose'

const CubeSchema = new Schema({
  name: String,
  cards: {
    type: [{
      id: Number,
      count: Number
    }],
    default: []
  }
})

const Cube = model('Cube', CubeSchema)

export default Cube
