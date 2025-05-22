const express = require('express')
const PistasServicio = require('../servicios/pistasServicio')

function pistasAPI(app) {
    const router = express.Router()
    app.use('/api/pistas', router)

    const pistasServicio = new PistasServicio()

    router.get('/', async function (req, res) {
        try {
            const pistas = await pistasServicio.getPistas()
            res.status(200).json({
                data: pistas,
                message: 'Prácticas recuperadas con éxito'
            })
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error obteniendo prácticas' })
        }
    })

    router.post('/', async function (req, res) {
        try {
            const { tituloPista, categoria, duracion, texto, favoritos, nota } = req.body
            const nuevaPista = await pistasServicio.postPista(tituloPista, categoria, duracion, texto, favoritos, nota)
            res.status(201).json({
                data: nuevaPista,
                message: 'Práctica creada con éxito'
            })
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error creando práctica' })
        }
    })

    router.get('/favoritos', async function (req, res) {
        try {
            const pistasFavoritas = await pistasServicio.getPistasFavoritas()
            res.status(200).json({
                data: pistasFavoritas,
                message: 'Pistas favoritas recuperadas con éxito'
            })
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error obteniendo pistas favoritas' })
        }
    })

    router.put('/:id/favorito', async function (req, res) {
        try {
            const { id } = req.params
            const pistaActualizada = await pistasServicio.alternarFavorito(id)

            if (!pistaActualizada) {
                return res.status(404).json({ message: 'Pista no encontrada' })
            }

            res.status(200).json({
                data: pistaActualizada,
                message: 'Favorito actualizado con éxito'
            })
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error actualizando favorito' })
        }
    })

    router.patch('/:id', async function (req, res) {
        try {
            const { id } = req.params
            const { nota } = req.body

            const pistaActualizada = await pistasServicio.actualizarNota(id, nota)
            if (!pistaActualizada) {
                return res.status(404).json({ message: 'Pista no encontrada' })
            }

            res.status(200).json({
                data: pistaActualizada,
                message: 'Nota actualizada con éxito'
            })
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error actualizando la nota' })
        }
    })

    router.get('/:id', async function (req, res) {
        try {
            const { id } = req.params
            const pista = await pistasServicio.getPistaById(id)

            if (!pista) {
                return res.status(404).json({ message: 'Pista no encontrada' })
            }

            res.status(200).json({
                data: pista,
                message: 'Pista recuperada con éxito'
            })
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error obteniendo la pista' })
        }
    })
}

module.exports = pistasAPI
