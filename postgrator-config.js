require('dotenv').config()

console.log("env_db_url", process.env.DATABASE_URL)
console.log("node_env", process.env.NODE_ENV)


module.exports = {
    "validateChecksums": false,
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV === 'test')
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL,
}