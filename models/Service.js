const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: {
        type: Boolean,
        default: true
      }
    },
    username: String,
    airdry: Array,
    active: {
      type: Boolean,
      default: 0
    },

    addressFrom: {
      location: {
        type: String,
        default: 'Point'
      },
      coordinates: []
    },
    clothesPicked: {
      type: Boolean,
      default: false
    },
    woosher: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    addressTo: {
      location: {
        type: String,
        default: 'Point'
      },
      coordinates: []
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Service', serviceSchema)
