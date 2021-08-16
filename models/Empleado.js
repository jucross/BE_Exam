const {Model} = require('objection')

class Empleado extends Model {

    static get tableName(){
        return 'Empleado'
    }

    static get idColumn(){
        return 'Id'
    }

    static get jsonSchema(){

        return {
            type: 'object',
            required: ['Id','Nombre','Apellido','Id_Cargo','Salario'],

            properties:{
                Id: {type: 'string', maxLength: 12},
                Nombre: {type: 'string', maxLength: 40},
                Apellido: {type: 'string', maxLength: 40},
                Salario: {type: 'number'},
                Id_Cargo: {type: 'integer'},
                Activo: {type: 'boolean'}
            }
        }
    }

    static get relationMappings(){

        const Cargo = require('./Cargo')

        return{
            empleado:{
                relation: Model.HasOneRelation,
                modelClass: Cargo,
                join:{
                    from:'Cargo.Id',
                    to:'Empleado.Cargo_Id'
                }
            }
        }
    }

}

module.exports = Empleado