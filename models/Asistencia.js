const mongoose = require('mongoose')
const Schema = mongoose.Schema

const asistenciaSchema = new Schema(
  {
    solicitante: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    fixer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    tipo: {
      type: String,
      enum: ['Cambio de llanta', 'Paso de corriente', 'Servicio de grúa', 'Abasto de gasolina'],
      required: true
    },
    location: {
      type: {
        type: String,
        default: 'Point'
      },
      address: {
        type: String
      },
      coordinates: {
        type: [Number]
      }
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ['Confirmación pendiente', 'Aceptada'],
      default: 'Confirmación pendiente'
    },
    images: {
      type: [String]
    }
  },
  { timestamps: true }
)

asistenciaSchema.index({
  location: '2dsphere'
})

module.exports = mongoose.model('Asistencia', asistenciaSchema)
