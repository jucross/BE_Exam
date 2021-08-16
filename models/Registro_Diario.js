const {Model} = require('objection')

class Registro_Diaro extends Model {

    static get tableName(){
        return 'Registro_Diario'
    }

    static get idColumn(){
        return 'Id'
    }

    static get jsonSchema(){
        return {
            type: 'object',
            required: [],

            properties: {
                Id: {type: 'integer'},
                Id_Empleado: {type: 'string', maxLength: 12},
                Hora_Entrada: {type: 'datetime'},
                Hora_Salida: {type: 'datetime' },
                Horas: {type: 'number'},
                Activo: {type: 'boolean'} 
            }
        }
    }

    static get relationMappings(){
        const Empleado = require('./Empleado')

        return {
            empleado:{
                relation: Model.HasOneRelation,
                modelClass: Empleado,
                join:{
                    from:'Empleado.Id',
                    to:'Registro_Diario.Id_Empleado'
                }
            }
        }
    }
}

module.exports = Registro_Diaro