const Usuario = require('../modelos/Usuario')

class UsuariosServicio {

    async getUsuarios() {
        return await Usuario.find()
    }

    async postUsuario(correo, contrasena) {
        const nuevoUsuario = new Usuario({ correo, contrasena })
        return await nuevoUsuario.save()
    }

    async getUsuarioByCorreo(correo) {
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) return null
    
        return {
            ...usuario.toObject(),
            id: usuario._id,
        }
    }
      

}

module.exports = UsuariosServicio
