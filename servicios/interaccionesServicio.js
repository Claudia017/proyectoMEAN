const Usuario = require('../modelos/Usuario')

class InteraccionesServicio {
  async agregarFavorito(usuarioId, pistaId) {
    const usuario = await Usuario.findById(usuarioId)
    if (!usuario) return null

    if (!usuario.favoritos.includes(pistaId)) {
      usuario.favoritos.push(pistaId)
      await usuario.save()
    }

    return usuario
  }

  async eliminarFavorito(usuarioId, pistaId) {
    const usuario = await Usuario.findById(usuarioId)
    if (!usuario) return null

    usuario.favoritos = usuario.favoritos.filter(favId => favId.toString() !== pistaId)
    await usuario.save()

    return usuario
  }

  async obtenerFavoritos(usuarioId) {
  const usuario = await Usuario.findById(usuarioId).populate('favoritos')
  if (!usuario) return null

  return usuario.favoritos.map(pista => ({
    ...pista.toObject(),
    id: pista._id
  }))
}


  async actualizarNota(usuarioId, pistaId, nota) {
    const usuario = await Usuario.findById(usuarioId)
    if (!usuario) return null

    const existente = usuario.notas.find(n => n.pista.toString() === pistaId)
    if (existente) {
      existente.nota = nota
    } else {
      usuario.notas.push({ pista: pistaId, nota })
    }

    await usuario.save()
    return {
      id: usuario._id,
      notaGuardada: { pista: pistaId, nota },
    }
  }


  async obtenerNotas(usuarioId) {
    const usuario = await Usuario.findById(usuarioId).populate('notas.pista')
    if (!usuario) return null

    return usuario.notas.map(n => ({
      pista: {
        id: n.pista._id,
        tituloPista: n.pista.tituloPista,
        categoria: n.pista.categoria,
        duracion: n.pista.duracion,
        texto: n.pista.texto,
      },
      nota: n.nota,
    }))
  }

}

module.exports = InteraccionesServicio
