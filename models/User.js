import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  isAdmin: Boolean,
  banned: {
    until: {
      type: Date,
      default: 0
    },
    reason: String
  }
}, { timestamps: true })

// generates a hashed password with bycrpt
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// for checking if the password is valid on login
UserSchema.methods.validPassword = function(password, userPassword) {
  return bcrypt.compareSync(password, userPassword)
}

const User = model('User', UserSchema)

export default User