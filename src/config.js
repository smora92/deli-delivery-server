module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://sylvia@localhost/deli-delivery',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://sylvia@localhost/deli-delivery-test',

    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api"
}