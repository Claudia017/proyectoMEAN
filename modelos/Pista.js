const mongoose = require('mongoose')

const pistaSchema = new mongoose.Schema({
    tituloPista: { type: String, required: true },
    categoria: { type: String, required: true },
    duracion: { type: String, required: true },
    texto: { type: String, required: true }
})

module.exports = mongoose.model('Pista', pistaSchema)