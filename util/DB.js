const {Models, Model} = require('objection')
const Knex = require('knex')

    const knex = Knex({
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: '5756870',
            database: 'RH'
        }    
    })

    Model.knex(knex)

module.exports = knex