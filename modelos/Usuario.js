const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true },
  contrasena: { type: String, required: true },
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pista' }],
  notas: [{
    pista: { type: mongoose.Schema.Types.ObjectId, ref: 'Pista' },
    nota: { type: String, default: '' }
  }]
})

module.exports = mongoose.model('Usuario', usuarioSchema)
