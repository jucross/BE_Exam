const express = require('express')
const bodyParser = require('body-parser')

const app = express()


//Importe de rutas
const empleadoRoutes = require('./routes/empleado')
const informeRoutes = require('./routes/informe')
const registroRoutes = require('./routes/registro')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

//Uso de rutas
app.use(empleadoRoutes)
app.use(informeRoutes)
app.use(registroRoutes)

 
app.listen(3000,()=>{
    console.log('Escuchando puerto 3000')
})