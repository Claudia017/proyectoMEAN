const Pista = require('../modelos/Pista')

class PistasServicio {
  async getPistas() {
    const pistas = await Pista.find()
    console.log("Pistas encontradas:", pistas)
    return pistas.map(pista => ({
      ...pista.toObject(),
      id: pista._id,
    }))
  }

  async getPistaById(id) {
    const pista = await Pista.findById(id)
    if (!pista) return null
    return {
      ...pista.toObject(),
      id: pista._id,
    }
  }

  async postPista(tituloPista, categoria, duracion, texto, favoritos, nota) {
    const nuevaPista = new Pista({ tituloPista, categoria, duracion, texto, favoritos, nota })
    return await nuevaPista.save()
  }

  async actualizarNota(id, nota) {
    const pista = await Pista.findByIdAndUpdate(id, { nota }, { new: true })
    return pista ? { ...pista.toObject(), id: pista._id } : null
  }

  async getPistasFavoritas() {
    const pistas = await Pista.find({ favoritos: true })
    return pistas.map(pista => ({
      ...pista.toObject(),
      id: pista._id
    }))
  }
  
  async alternarFavorito(id) {
    const pista = await Pista.findById(id)
    if (!pista) return null
  
    pista.favoritos = !pista.favoritos
    await pista.save()
  
    return { ...pista.toObject(), id: pista._id }
  }
  
}

module.exports = PistasServicio
