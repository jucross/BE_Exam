const express = require('express')
const query = require ('../util/Query')

const router = express.Router()

//Registro de Entrada
router.post('/entrada',query.Registro_Entrada)

//Registro de Salida
router.patch('/salida/:id',query.Registro_Salida)

//Reinicio de Semana
router.delete('/semana',query.Comienzo_Semana)
 
module.exports = router