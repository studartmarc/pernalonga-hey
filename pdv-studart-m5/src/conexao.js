const knex = require("knex")({
    client: "pg",
    connection: {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'pdv',
    }
});

module.exports = knex;