const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const register = require('../routes/users');
const auth = require('../routes/auth');
const errorHandler = require('../middleware/error');


module.exports = function (app) {

    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/user', register);
    app.use('/api/auth', auth);

    app.use(errorHandler);

};