import { Schema, model } from 'mongoose'
import { CardItem } from './nonDatabase'

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
