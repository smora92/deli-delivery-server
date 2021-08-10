const knex = require('knex')
const parse = require("pg-connection-string").parse
const app = require('./app')
const { PORT, DATABASE_URL } = require('./config')

const pgConfig = parse(DATABASE_URL)
pgConfig.ssl = { rejectUnauthorized: false };

const db = knex({
    client: 'pg',
    connection: pgConfig,

})

app.set('db', db)



app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})
