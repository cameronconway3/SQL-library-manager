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
    // const books = await Book.findAll({ order: [['createdAt', 'DESC']]});
    // console.log(books.toJSON());
    res.render('books/index');
}));


// GET /books/new - Show the create new book form
router.get("/books/new", asyncHandler(async (req, res) => {

}));


// POST /books/new - Posts a new book to the database



// GET /books/:id - Shows book detail form
router.get("/books/:id", asyncHandler(async (req, res) => {

}));


// POST /books/:id - Updates book info in the database



// POST /books/:id/delete - Deletes a book.


module.exports = router;