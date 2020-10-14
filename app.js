const express = require('express');

const routes = require('./routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Routes
 */
app.use('/', routes);
