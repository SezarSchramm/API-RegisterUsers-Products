const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '134625',
        database: 'market_cubos'
    }
});

module.exports = knex