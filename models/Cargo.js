const { Model } = require('objection');

class Cargo extends Model {

    static get tableName(){
        return 'Empleado'
    }

    static get idColumn(){
        return 'Id'
    }

    static get jsonSchema(){
        return {
            type: 'object',
            required: ['Cargo','Activo'],

            properties: {
                Id: {type: 'integer'},
                Cargo: {type: 'string', maxLength: 40},
                Activo: {type: 'boolean'}
            }
        }
    }
}

module.exports = Cargo