const express = require('express');
const UsuariosServicio = require('../servicios/usuariosServicio');
const Usuario = require('../modelos/Usuario');

function usuariosAPI(app) {
    const router = express.Router()
    app.use('/api/usuarios', router)

    const usuariosServicio = new UsuariosServicio()

    router.get('/', async function (req, res) {
        try {
            const usuarios = await usuariosServicio.getUsuarios()
            res.status(200).json({
                data: usuarios,
                message: 'Usuarios recuperados con éxito'
            })
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error obteniendo usuarios' })
        }
    })

    router.get('/correo/:correo', async function (req, res) {
        try {
            const correo = req.params.correo
            const usuario = await usuariosServicio.getUsuarioByCorreo(correo)
            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                })
            }
            res.status(200).json(usuario)
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error obteniendo el usuario' })
        }
    })
    

    router.post('/', async function (req, res) {
        try {
            const { correo, contrasena } = req.body
            const nuevoUsuario = await usuariosServicio.postUsuario(correo, contrasena)
            res.status(201).json({
                data: nuevoUsuario,
                message: 'Usuario creado con éxito'
            })
        } catch (err) {
            console.error(`Error: ${err}`)
            res.status(500).json({ message: 'Error creando usuario' })
        }
    })
}

module.exports = usuariosAPI
