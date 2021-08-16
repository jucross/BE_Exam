const express = require('express')
const  query = require('../util/Query')

const router = express.Router()


//Informe de Pago
router.get('/pagos',(req,res)=>{
    res.status(200).json({
        message: 'Reporte pago'    
    })
})

//Informe de pago por persona
router.get('/pago/:id',query.Pago_Empleado)
 
module.exports = router