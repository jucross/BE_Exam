const moment = require('moment')

const knex = require('./DB')
const Empleado = require('../models/Empleado')
const Registro_Diario = require('../models/Registro_Diario')

//me gusta mas
async function Select_Empleados(req, res){
    try{
    Empleados=await Empleado.query()
    res.status(200).json({
        message: 'select complete',
        empleado: Empleados
    })}
    catch(err){
        res.status(400).json({
            Error: err
        })
    }
}

 async function Insert_Empleado(req,res){
    try{
    const REmpleado = await Empleado.query().insert(
        {
        Id: req.body.id,
        Nombre: req.body.nombre,
        Apellido: req.body.apellido,
        Id_Cargo: parseInt(req.body.id_cargo,10),
        Salario: Number(req.body.salario_semanal),
        Activo: true
    })
    res.status(200).json({
        message: 'insert complete',
        empleado: REmpleado
    })}
    catch(err){
        res.status(400).json({
            Error: err
        })
    }
}

async function Edit_Empleado(req,res){
    try{
    const REmpleado = await Empleado.query().findById(req.params.id).patch({
        Nombre: req.body.nombre,
        Apellido: req.body.apellido,
        Id_Cargo: parseInt(req.body.id_cargo,10),
        Salario: Number(req.body.salario_semanal),
        Activo: true
    })
    res.status(200).json({
        message: 'update complete',
        empleado: REmpleado
    })}
    catch(err){
        res.status(400).json({
            Error: err
        })
    }
}

async function Delete_Empleado(req,res){
    try{
    const REmpleado = await Empleado.query().findById(req.params.id).patch({
        Activo: false
    })
    res.status(200).json({
        message: 'delete complete'
    })}
    catch(err){
        res.status(400).json({
            Error: err
        })
    }
}

async function Registro_Entrada(req,res){
    try{
    let hora=new Date()
    const Entrada = await Registro_Diario.query().insert({
        Id_Empleado: req.body.id_empleado,
        Hora_Entrada: hora,
        Activo: true
    })
    res.status(200).json({
        message: 'Entrada registrada'
    })}
    catch(err){
        res.status(400).json({
            Error: err
        })
    }
}

async function Registro_Salida(req,res){
   try{
    let tiempo = new Date()
   const entrada = await 
   Registro_Diario.query()
                .select('Hora_Entrada')
                .where('Id_Empleado',req.params.id)
                .where('Hora_Salida',null)
    
    he = moment(entrada[0].Hora_Entrada)
    hs = moment(tiempo)
    horas = hs.diff(he, 'hours')

   const Salida = await 
   Registro_Diario.query()
                .where('Id_Empleado',req.params.id)
                .where('Hora_Salida',null)
                .patch({
       Hora_Salida: tiempo,
       Horas:horas
   })
   
   res.status(200).json({
    message: 'Salida registrada'
})}
catch(err){
    res.status(400).json({
        Error: err
    })
} 
}

async function Comienzo_Semana(req,res){
    try{
    const ResetSemana= await Registro_Diario.query().where('Activo',true).patch({
        Activo:false
    })
    res.status(200).json({
        message: 'Semana Reiniciada'
    })}
    catch(err){
        res.status(400).json({
            Error: err
        })
    }
}

async function Pago_Empleado(req,res){
    try{
    const REmpleado = await 
    Registro_Diario.query()
                    .select('Id_Empleado','Horas')
                    .where('Id_Empleado',req.params.id)
                    .where('Activo',true)
                    
    let totalH=REmpleado.reduce((sum,value)=>(sum+parseInt(value.Horas,10)),0)
    
    const sueldo = await Empleado.query().select('Salario').findById(req.params.id) 
    
    res.status(200).json({
        Id:req.params.id,
        Horas_Trabajadas: totalH,
        Sueldo:sueldo.Salario*totalH/48
    })}
    catch(err){
        res.status(400).json({
            Error: err
        })
    }
}

async function Pagos_Empleados(req, res){
    const LEmpleados = await Registro_Diario.query().where('Activo',true)
}


exports.Select_Empleados = Select_Empleados
exports.Insert_Empleado = Insert_Empleado
exports.Edit_Empleado = Edit_Empleado
exports.Delete_Empleado = Delete_Empleado

exports.Registro_Entrada = Registro_Entrada
exports.Registro_Salida = Registro_Salida
exports.Comienzo_Semana = Comienzo_Semana

exports.Pago_Empleado = Pago_Empleado
exports.Pagos_Empleados = Pagos_Empleados