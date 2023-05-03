const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemaevento = new eschema({
    titulo: String,
    imagen: String,
    descripcion: String,
    fechaInicio: String,
    fechaFin: String,
    hora: String,
    aforo: String,
    idevento: String
})

const ModeloEvento = mongoose.model('eventos', eschemaevento)
module.exports = router

//prueba
/*
router.get('/ejemplo', (req,res) => {
    res.end('ejemplo carga conexcion')
})
*/

//Crear evento

router.post('/agregarevento', (req, res) => {
    const nuevoevento = new ModeloEvento({
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        hora: req.body.hora,
        aforo: req.body.aforo,
        idevento: req.body.idevento
    })

    nuevoevento.save()
        .then(result => {
            res.send('Evento agregado correctamente')
        })
        .catch(error => {
            res.send(error)
        })
})

//Lista de eventos
router.get('/obtenereventos', (req, res) => {
    ModeloEvento.find({})
        .then(docs => {
            res.send(docs)
        })
        .catch(error => {
            res.send(error)
        })
})

//Datos del evento
router.post('/obtenerdataevento', (req, res) => {
    ModeloEvento.find({ idevento: req.body.idevento }, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//Actualizar evento
router.post('/actualizarevento', (req, res) => {
    ModeloEvento.findOneAndUpdate({ idevento: req.body.idevento }, {
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        hora: req.body.hora,
        aforo: req.body.aforo,
        idevento: req.body.idevento
    }, (err) => {
        if (!err) {
            res.send('Evento actualizado')
        } else {
            res.send(err)
        }
    })
})

//Borrar evento
router.post('/borrarevento', (req, res) => {
    ModeloEvento.findByIdAndDelete({ idevento: req.query.idevento }, (err) => {
        if (!err) {
            res.send('Evento eliminado')
        } else {
            res.send(err)
        }
    })
})