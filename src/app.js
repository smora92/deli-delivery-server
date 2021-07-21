require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
// const { NODE_ENV } = require('./config')
const { CLIENT_ORIGIN, NODE_ENV } = require('./config')
const restaurantsRouter = require('./restaurants/restaurants-router')
const menusRouter = require('./menu/menus-router')
const { response } = require('express')

const app = express()
const morganOption = (process.env.NODE_ENV === 'production') ? 'tiny' : 'common';
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors({
    origin: CLIENT_ORIGIN
}))

app.use(restaurantsRouter);
app.use(menusRouter)
app.use(function errorHandler(error, req, res, next) {
    let response
    if (process.env.NODE_ENV === 'production') {
        response = { error: { message: 'server error ' } }
    } else {
        // console.log(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

// const validTypes = ['food', 'drinks'];
// function handleGetTypes(req, res) {
//     res.json(validTypes)
// }
// app.get('/types', function handleGetTypes(req, res) {
//     if(req.query.type) {
//         response = response.filter(menu =>
//             menu.type.includes(req.query.type)
//             )
//     }
//     res.json()
// } )

module.exports = app

