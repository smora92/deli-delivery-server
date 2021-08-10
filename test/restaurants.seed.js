function makeRestaurantsArray() {
    return [
        {
            // "id": "001",
            "restaurant_name": "Burger King",
            "description": "Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don’t need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop",
            "rating": "4.8",
            "delivery_fee": "6.20",
            // "image": "https://via.placeholder.com/300/09f/fff.png"
        },
        {
            // "id": "002",
            "restaurant_name": "The Place Restaurant",
            "description": "Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don’t need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop",
            "rating": "4.8",
            "delivery_fee": "20.00",
            // "image": "https://via.placeholder.com/300/09f/fff.png"
        },
    ]
}
module.exports = {
    makeRestaurantsArray,
}