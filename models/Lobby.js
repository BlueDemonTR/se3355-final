import { Schema, model } from 'mongoose'

const CardList = {
  type: [Number],
  default: []
}

const AttendantSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  drafted: CardList,
  active: {
    type: Boolean,
    default: true
  },
  draftingPack: {
    type: Number
  },
  takenTurn: {
    type: Boolean,
    default: false
  }
})

const CardSchema = new Schema({
  name: String,
  id: Number,
  typeline: {
    type: [String],
    default: []
  },
  scale: Number,
  level: Number,
  frameType: String,
  ygoprodeck_url: String
}, { strict: true })

const LobbySchema = new Schema({
  name: String,
  passcode: String,
  cube: {
    type: Schema.Types.ObjectId,
    ref: 'Cube',
    required: true
  },
  maxLobbySize: {
    type: Number,
    min: 2,
    max: 8,
    default: 15
  },
  packSize: {
    type: Number,
    default: 15
  }, 
  draftSize: {
    type: Number,
    default: 60
  },
  public: {
    type: Boolean,
    default: false
  },
  remainingCards: CardList,
  cubeContent: CardList,
  cardData: {
    type: Map,
    of: CardSchema
  },
  status: {
    type: String,
    enum: ['waiting', 'drafting', 'ended'],
    default: 'waiting'
  },
  packs: {
    type: [CardList],
    default: []
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendants: {
    type: [AttendantSchema],
    default: []
  }
}, { timestamps: true })

const Lobby = model('Lobby', LobbySchema)

export default Lobby
