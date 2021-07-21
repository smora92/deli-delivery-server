const RestaurantsService = {
  getAllRestaurants(knex) {
    return knex.select('*').from('restaurants')
  },
  insertRestaurant(knex, newRestauraunt) {
    return knex
      .insert(newRestauraunt)
      .into('restaurants')
      .returning('*')
      .then(rows => {
        return [0]
      })
  },
  getById(knex, id) {
    return knex.from('restaurants').select('*').where('id', id).first()
  },
  deleteRestaurant(knex, id) {
    return knex('restaurants')
      .where({ id })
      .delete()
  },
  updateRestaurant(knex, id, newRestaurantFields) {
    return knex('restaurants')
      .where({ id })
      .update(newRestaurantFields)
  },
  getMenu(knex, id) {
    return knex('menu')
      .where({ restaurant_id: id })

  }

}

module.exports = RestaurantsService;