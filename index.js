const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const usuariosAPI = require('./rutas/usuariosAPI')
const pistasAPI = require('./rutas/pistasAPI')
const interaccionesAPI = require('./rutas/interaccionesAPI')
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Conexión a MongoDB Atlas
const DB_USER = 'cnsoliscoinf'
const DB_PASSWORD = 'CxSdfx2w2HfqIQrL'
const MONGO_ATLAS_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xqyhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect("mongodb+srv://cnsoliscoinf:CxSdfx2w2HfqIQrL@cluster0.xqyhh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error de conexión:", err))

const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))

usuariosAPI(app)
pistasAPI(app)
interaccionesAPI(app)

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})
