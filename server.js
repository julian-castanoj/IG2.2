const express = require('express')
const app = express()

//Import conexion a mongo
const archivoBD = require('./conexion')

//Archivo de rutas y modelos
const rutausuario = require('./rutas/usuario')

// Informacion en los campos
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.unsubscribe(bodyParser.urlencoded({extended:'true'}))

app.use('/api/usuario', rutausuario)


app.get('/', (req,res) => {
    res.end('Servidor backend Node.js')
})

//Servidor
app.listen(5000, function(){
    console.log('El servidor esta corriendo')
})