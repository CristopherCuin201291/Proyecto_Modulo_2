const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    name: String,
    lastname: String,
    email: {
      type: String,
      required: true
    },
    phonenumber: Number,
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Confirmacion pendiente', 'Activo'],
      default: 'Confirmacion pendiente'
    },
    confirmationCode: String,
    image: {
      type: String
    },
    role: {
      type: String,
      enum: ['Fixer', 'User'],
      required: true
    }
  },
  { timestamps: true }
)

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  hashField: 'password'
})

module.exports = mongoose.model('User', userSchema)
