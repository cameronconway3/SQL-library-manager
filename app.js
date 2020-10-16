/*
Treehouse Techdegree:
FSJS Project 8 - SQL Library Manager
*/

// Host port
const host = 3000;

const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

const routes = require('./routes/index')
const books = require('./routes/books');


const app = express();


// Load static files
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Body Parser
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


/**
 * Routes
 */
app.use('/books', books);
app.use('/', routes);

/**
 * Handle Errors
 */
// 404 handler - 404 responses are not the result of an error
app.use((req, res, next) => {
    const err = new Error(`The page '${req.url}' doesn't exist.`);
    err.status = 404;
    next(err);
});
// Global error handler
app.use((err, req, res, next) => {
    // Set err.status to current err.status if set, if not set to 500
    err.status = err.status || 500;
    // Set err.message to current err.message if set, else set to one disaplyed 
    err.message = err.message || `Looks like there was a problem on the server.`;
    // set the HTTP status for the response to err.status, render 'error.pug' and pass the err object
    if(err.status === 500) {
        res.status(500).render('error', { err, title: '500 Error' } );
    } else {
        res.status(err.status).render('page-not-found', { err, title: `${err.status} Error` } );
    }
    // Log the error message and status to the console 
    console.log(`Error message: ` + err.message);
    console.log(`Error status: ` + err.status);
});


// Listen on 'host', logs a string to the console of server detail
app.listen(host, () => {
    console.log(`The application is running on localhost:` + host)
});
module.exports = app;





