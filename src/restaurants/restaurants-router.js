const path = require('path')
const express = require('express')
const knex = require('knex')
const xss = require('xss')
const RestaurantsService = require('./restaurants-service')

const restaurantsRouter = express.Router()
const jsonParser = express.json()

const serializeRestaurant = restaurant => ({
	id: restaurant.id,
	restaurant_name: xss(restaurant.restaurant_name),
	description: xss(restaurant.description),
	rating: Number(restaurant.rating),
	delivery_fee: Number(restaurant.delivery_fee),
	image: xss(restaurant.image)

})

restaurantsRouter
	.route('/api/restaurants') //get and post apply to same path so they're chained
	.get((req, res, next) => {

		RestaurantsService.getAllRestaurants(
			req.app.get('db')
		)
			.then(restaurants => {

				res.json(restaurants)
			})
			.catch(next)
	})
	.post(jsonParser, (req, res, next) => {
		const { restaurant_name, description, rating, delivery_fee, image } = req.body
		const newRestauraunt = { restaurant_name, description, rating, delivery_fee, image }

		for (const [key, value] of Object.entries(newRestauraunt)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` }
				})
			}
		}
		RestaurantsService.insertRestaurant(
			req.app.get('db'),
			newRestauraunt
		)
			.then(restaurant => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${restaurant.id}`))
					//path is a module that supports .join to calc valid path without double slashes
					.json(serializeRestaurant(restaurant))
			})
			.catch(next)
	})

restaurantsRouter
	.route('/api/restaurants/:id')
	.all((req, res, next) => {
		RestaurantsService.getById(
			req.app.get('db'),
			req.params.id
		)
			.then(restaurant => {
				if (!restaurant) {
					return res.status(404).json({
						error: { message: `restaurant doesn't exist` }
					})
				}
				res.restaurant = restaurant
				next()
			})
			.catch(next)
	})

	.get((req, res) => {
		res.json(serializeRestaurant(res.restaurant))
	})

	.delete((req, res, next) => {
		RestaurantsService.deleteRestaurant(
			req.app.get('db'),
			req.params.id
		)
			.then(deleted => {
				res.status(204).end()
			})
			.catch(next)
	})

	.patch(jsonParser, (req, res, next) => {
		const { restaurant_name, description, rating, delivery_fee, image } = req.body
		const updateRestaurantFields = { restaurant_name, description, rating, delivery_fee, image }

		const numberOfValues = Object.values(updateRestaurantFields).filter(Boolean).length
		if (numberOfValues === 0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain either 'restaurant_name', 'description', 'rating', 'delivery_fee' `
				}
			})
		}
		RestaurantsService.updateRestaurant(
			req.app.get('db'),
			req.params.id,
			updateRestaurantFields
		)
			.then(updated => {
				res.status(204).end()
			})
			.catch(next)
	})

restaurantsRouter
	.route('/api/restaurants/:id/menu')
	.get((req, res, next) => {
		RestaurantsService.getMenu(
			req.app.get('db'),
			req.params.id,
		)
			.then((menu) => {
				res.json(menu).status(200)
			})
			.catch(next)

	})

module.exports = restaurantsRouter;