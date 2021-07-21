const path = require('path')
const express = require('express')
const xss = require('xss')
const MenusService = require('./menus-service')

const menusRouter = express.Router()
const jsonParser = express.json()

const serializeMenu = menu => ({
    id: menu.id,
    item_name: xss(menu.item_name),
    price: menu.price,
    category: xss(menu.category)
})

// item_type food or drinks
menusRouter
    .route('/api/menus')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        MenusService.getAllMenus(knexInstance)
            .then(menus => {
                res.json(menus.map(serializeMenu))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { item_name, price, category, restaurant_id } = req.body
        const newMenu = { item_name, price, category, restaurant_id }

        for (const [key, value] of Object.entries(newMenu))
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        MenusService.insertMenu(
            req.app.get('db'),
            newMenu
        )
            .then(menu => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `${menu.id}`))
                    .json(serializeMenu(menu))
            })
            .catch(next)
    })
menusRouter
    .route('/api/menus/:menu_id')
    .all((req, res, next) => {
        MenusService.getById(
            req.app.get('db'),
            req.params.menu_id
        )
            .then(menu => {
                if (!menu) {
                    return res.status(404).json({
                        error: { message: `Menu doesn't exist` }
                    })
                }
                res.menu = menu
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        res.json(serializeMenu(res.menu))
    })
    .delete((req, res, next) => {
        MenusService.deleteMenu(
            req.app.get('db'),
            req.params.menu_id
        )
            .then(deleted => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { item_name, price, category } = req.body
        const MenuToUpdate = { item_name, price, category }

        const numberOfValues = Object.values(MenuToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'item_name', 'price' or 'category'`
                }
            })

        MenusService.updateMenu(
            req.app.get('db'),
            req.params.menu_id,
            MenuToUpdate
        )
            .then(updated => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = menusRouter;




// item_name, price, category

