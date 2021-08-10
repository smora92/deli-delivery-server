require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const restaurantsRouter = require('./restaurants/restaurants-router')
const menusRouter = require('./menu/menus-router')
const { response } = require('express')

const app = express()
const morganOption = (process.env.NODE_ENV === 'production') ? 'tiny' : 'common';
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())


app.use(restaurantsRouter);
app.use(menusRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (process.env.NODE_ENV === 'production') {
        response = { error: { message: 'server error ' } }
    } else {

        response = { message: error.message, error }
    }
    res.status(500).json(response)
})


module.exports = app

