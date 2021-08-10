const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { TEST_DATABASE_URL } = require('../src/config')
const { makeRestaurantsArray } = require('./restaurants.seed')

describe.only('Restaurants Service object', function () {
    let db;
    let testRestaurants = makeRestaurantsArray();

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: TEST_DATABASE_URL,
        })
        app.set('db', db)
    })


    before(() => db('restaurants').truncate());

    afterEach(() => db('restaurants').truncate());

    after(() => db.destroy());


    context(`Given no restaurants`, () => {
        it(`responds with 200 and an empty list`, () => {
            return supertest(app)
                .get('/api/restaurants')
                .expect(200, [])
        })
    })
    context(`Given 'restaurants' has data`, () => {
        const testRestaurants = makeRestaurantsArray()

        beforeEach('insert restaurants', () => {
            return db
                .into('restaurants')
                .insert(testRestaurants)
        })
        it('GET /api/restaurants responds with 200 and all the restaurants', () => {
            const expectedRestaurants = testRestaurants.map(restaurant => ({
                ...restaurant,
            }));
            return supertest(app)
                .get('/api/restaurants')
                .expect(200, expectedRestaurants)
        })

    })

})
//testing id endpoints when id is UUID????

//     describe(`GET /restaurants/:id`, () => {
    //         context('Given there are restaurants in the database', () => {
        //             const testRestaurants = makeRestaurantsArray()

        //             beforeEach('insert restaurants', () => {
            //                 return db
            //                     .into('restaurants')
            //                     .insert(testRestaurants)
            //             })

            // it('GET /api/restaurants/:id responds with 200 and the specified restaurant', () => {
            //     const restaurantId = 2
            //     const expectedRestaurant = testRestaurants[restaurantId - 1]
            //     return supertest(app)
            //         .get(`/restaurants/${restaurantId}`)
            //         .expect(200, expectedRestaurant)
            // })
            //         })
//         context(`Given no restaurants`, () => {
//             it(`responds with 404`, () => {
//                 const restaurantId = 123456
//                 return supertest(app)
//                     .get(`/restaurants/${restaurantId}`)
//                     .expect(404, { error: { message: `restaurant doesn't exist` } })
//             })
//         })
//     })

//     describe.only(`POST /api/restaurants`, () => {
//         it(`creates a restaurant, responding with 201 and the new restaurant`, function () {
//             const requiredFields = [restaurant_name, description, rating, delivery_fee]

//             requiredFields.forEach(field => {

//                 const newRestauraunt = {
//                     restaurant_name: 'Test new Restaurant',
//                     description: "food",
//                     rating: '3',
//                     delivery_fee: '100'
//                 }
//                 return supertest(app)
//                     .post('/api/restaurants')
//                     .send(newRestauraunt)
//                     .expect(201)
//                     .expect(res => {
//                         expect(res.body.restaurant_name).to.eql(newRestauraunt.restaurant_name)
//                         expect(res.body.description).to.eql(newRestaurant.description)
//                         expect(res.body.rating).to.eql(newRestaurant.rating)
//                         expect(res.body).to.have.property('id')
//                         expect(res.headers.location).to.eql(`/api/restaurants/${res.body.id}`)

//                     })
//                     .then(postRes =>
//                         supertest(app)
//                             .get(`/api/restaurants/${postRes.body.id}`)
//                             .expect(postRes.body)
//                     )
//             })

//             it(`responds with 400 and an error message when the '${field}' is missing`, () => {
//                 delete newRestaurant[field]

//                 return supertest(app)
//                     .post('/api/restaurants')
//                     .send(newRestaurant)
//                     .expect(400, {
//                         error: { message: `Missing '${field}' in request body` }
//                     })
//             })
//         })
//     })




//     describe.only(`DELETE /api/restaurants/:restaurant_id`, () => {
//         context('Given there are restaurants in the database', () => {
//             const testRestaurants = makeRestaurantsArray()

//             beforeEach('insert restaurants', () => {
//                 return db
//                     .into('restaurants')
//                     .insert(testRestaurants)
//             })

//             it('responds with 204 and removes the restaurant', () => {
//                 const idToRemove = 2
//                 const expectedRestaurants = testRestaurants.filter(restaurant => restaurant.id !== idToRemove)
//                 return supertest(app)
//                     .delete(`/api/restaurants/${idToRemove}`)
//                     .expect(204)
//                     .then(res =>
//                         supertest(app)
//                             .get(`/api/restaurants`)
//                             .expect(expectedRestaurants)
//                     )
//             })
//         })
//         context(`Given no restaurants`, () => {
//             it(`responds with 404`, () => {
//                 const restaurantId = 123456
//                 return supertest(app)
//                     .delete(`/restaurants/${restaurantId}`)
//                     .expect(404, { error: { message: `restaurant doesn't exist` } })
//             })
//         })
//     })
// })