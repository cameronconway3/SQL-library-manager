// Host port
const host = 3000;

const express = require('express');
const path = require('path');

const books = require('./routes/books');

const app = express();


// Load static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


/**
 * Routes
 */
app.use('/', (req, res, next) => {
    res.redirect("/books")
});
app.use('/books', books);





// Listen on 'host', logs a string to the console of server detail
app.listen(host, () => {
    console.log(`The application is running on localhost:` + host)
});
module.exports = app;





