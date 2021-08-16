const express = require('express')
const query = require ('../util/Query')

const router = express.Router()

//Listado de empleados
router.get('/empleado',query.Select_Empleados)

//Registro de nuevo empleado
router.post('/empleado',query.Insert_Empleado)

//Editar a un empleado
router.patch('/empleado/:id',query.Edit_Empleado)

//Borrar logicamente a un empleado
router.delete('/empleado/:id',query.Delete_Empleado)

module.exports = router