const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Handler function to wrap each route
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(error){
            // Forward error to the global error handler
            next(error);
        }
    }
}

// GET /books - Show the full list of books
router.get('/', asyncHandler(async (req, res) => {
    // Get all books in database
    const books = await Book.findAll({ order: [['createdAt', 'DESC']]});
    res.render('books/index', {books});
}));


// GET /books/new - Show the create new book form
router.get('/new', (req, res) => {
    res.render('books/new', {book: Book.create(), title: 'Book'})
});

// POST /books/new - Posts a new book to the database
router.post('/new', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect('/');
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            book = await Book.build(req.body);
            res.render('books/new', {book, err: err.err, title: 'New Book' })
        } else {
            throw err;
        }
    }
}));

// GET /books/:id - Shows book detail form
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        res.render('books/update', {book, title: 'Update Book'})
    } else {
        const err = new Error("The book with that ID does not exist.");
        err.status = 404;
        next(err);
    }
}));


// POST /books/:id - Updates book info in the database



// POST /books/:id/delete - Deletes a book.


module.exports = router;