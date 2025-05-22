const express = require('express')
const InteraccionesServicio = require('../servicios/interaccionesServicio')

function interaccionesAPI(app) {
  const router = express.Router()
  app.use('/api/interacciones', router)

  const servicio = new InteraccionesServicio()

  router.post('/:usuarioId/favorito/:pistaId', async (req, res) => {
    try {
      const usuario = await servicio.agregarFavorito(req.params.usuarioId, req.params.pistaId)
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })
      res.status(200).json({ message: 'Favorito añadido', favoritos: usuario.favoritos })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error añadiendo favorito' })
    }
  })

  router.delete('/:usuarioId/favorito/:pistaId', async (req, res) => {
    try {
      const usuario = await servicio.eliminarFavorito(req.params.usuarioId, req.params.pistaId)
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })
      res.status(200).json({ message: 'Favorito eliminado', favoritos: usuario.favoritos })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error eliminando favorito' })
    }
  })

  router.get('/:usuarioId/favoritos', async (req, res) => {
    try {
      const pistasFavoritas = await servicio.obtenerFavoritos(req.params.usuarioId)
      if (!pistasFavoritas) return res.status(404).json({ message: 'Usuario no encontrado' })

      res.status(200).json(pistasFavoritas)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error obteniendo favoritos' })
    }
  })



  router.patch('/:usuarioId/nota/:pistaId', async (req, res) => {
    try {
      const usuario = await servicio.actualizarNota(req.params.usuarioId, req.params.pistaId, req.body.nota)
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })
      res.status(200).json({ message: 'Nota guardada', notas: usuario.notas })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error guardando nota' })
    }
  })

  router.get('/:usuarioId/notas', async (req, res) => {
    try {
      const notas = await servicio.obtenerNotas(req.params.usuarioId)
      if (!notas) return res.status(404).json({ message: 'Usuario no encontrado' })
      res.status(200).json({ notas })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error obteniendo notas' })
    }
  })
}

module.exports = interaccionesAPI
