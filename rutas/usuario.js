const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemausuario = new eschema({
    nombre: String,
    apellido: String,
    cc: String,
    correo: String,
    telefono: String,
    edad: String,
    sexo: String,
    tipoVinculo: String,
    formacion: String,
    idusuario: String
})

const ModeloUsuario = mongoose.model('usuarios', eschemausuario)
module.exports = router

//prueba
/*
router.get('/ejemplo', (req,res) => {
    res.end('ejemplo carga conexcion')
})
*/

//Crear usuario

router.post('/agregarusuario', (req, res) => {
    const nuevousuario = new ModeloUsuario ({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cc: req.body.cc,
    correo: req.body.correo,
    telefono: req.body.telefono,
    edad: req.body.edad,
    sexo: req.body.sexo,
    tipoVinculo: req.body.tipoVinculo,
    formacion: req.body.formacion,
    idusuario: req.body.idusuario
    })
    nuevousuario.save()
        .then(result => {
            res.send('usuario agregado correctamente');
        })
        .catch(error => {
            res.send(error);
        });
})

//Lista de usuarios
router.get('/obtenerusuarios', (req,res)=> {
    ModeloUsuario.find({})
        .then(docs => {
            res.send(docs);
        })
        .catch(error => {
            res.send(error);
        });
});

//Datos usuarios
router.post('/obtenerdatausuarios', (req, res) => {
    ModeloUsuario.find({idusuario:req.body.idusuario}, function(docs,err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }

    })
       
    });
   
//actualizar
router.post('/actualizarusuario', (req, res) => {

    ModeloUsuario.findOneAndUpdate({idusuario:req.body.idusuario}, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cc: req.body.cc,
        correo: req.body.correo,
        telefono: req.body.telefono,
        edad: req.body.edad,
        sexo: req.body.sexo,
        tipoVinculo: req.body.tipoVinculo,
        formacion: req.body.formacion,
        idusuario: req.body.idusuario
    },(err) =>{
        if(!err){
        res.send('usuario actualizado')
        } else {
            res.send(err)
        }

        })
});

router.post('/borrarusuario', (req, res) => {
    ModeloUsuario.findByIdAndDelete({ idusuario: req.query.idusuario }, (err) => {
      if (!err) {
        res.send('Usuario eliminado')
      } else {
        res.send(err)
      }
    })
  })

   

