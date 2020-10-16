const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Op is used for more complex querying
const { Op }= require('sequelize');


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
    // If the query 'page' is defined, perform pagination logic, else return all the books
    if(req.query.page) {
        // Get all the books
        const allBooks = await Book.findAll({order: [['createdAt', 'DESC']]});
    
        // WOrk out the number of books returned from the above query using .length
        let numOfBooks = allBooks.length;
        // Amount of books on each page
        let booksPerPage = 5;
    
        // Assign the value of 'page' in query to 'page'
        let page = req.query.page;
            
        // Get all the books that satisfy the offset and limit value
        const books = await Book.findAll({ 
            order: [['createdAt', 'DESC']],
            offset: ((page-1) * booksPerPage), 
            limit: booksPerPage
        });
    
        // Render the index page with the filtered books, send a number of variables to work out the number of pagination buttons
        res.render('books/index', {books, booksPerPage: 5, numOfBooks: allBooks.length, title: "Books" });
    }
    else {
        const books = await Book.findAll({order: [['createdAt', 'DESC']]});
        res.render('books/index', {books, title: "Books"});
    }
}));

// POST /books - Shows a list of the books matching the search value
router.post('/', asyncHandler(async (req, res) => {
    // Find All the books that satisfy the where condition
    const books = await Book.findAll({
        where: {
            // If 'title' or 'author' or 'genre' or 'year' contain (using like key word logic) 'req.body.search' 
            [Op.or]: [
                {
                    title: {
                        [Op.like]: '%' + req.body.search + '%'
                    },
                },
                {
                    author: {
                        [Op.like]: '%' + req.body.search + '%'
                    },
                },
                {
                    genre: {
                        [Op.like]: '%' + req.body.search+ '%'
                    },
                },
                {
                    year: {
                        [Op.like]: '%' + req.body.search + '%'
                    },
                }
            ]
        } 
    })
    const totalBooks = await Book.findAll({})
    // Render index and send variables which help to render the correct page layout
    res.render('books/index', {books, searchedBooks: books.length, totalBooks: totalBooks.length, title: "Books" })
}));


// GET /books/new - Show the create new book form
router.get('/new', (req, res) => {
    res.render('books/new-book', {book: Book.create(), title: 'New Book'})
});

// POST /books/new - Posts a new book to the database
router.post('/new', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        // redirect to the book page using its 'id'
        res.redirect(`/books/${book.id}`);
    } catch (err) {
        // When the conditions expressed in the Book model are not met then err.name === 'SequelizeValidationError'
        if (err.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            // Render the new-book page again but with the errors
            res.render("books/new-book", {book, err: err.errors, title: "New Book" })
        } else {
            throw err;
        }
    }
}));

// GET /books/:id - Shows book detail form related to the book with ID entered into the URL
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        res.render('books/update-book', {book, title: 'Update Book'})
    } else {
        const err = new Error("We can't seem to find the page you're looking for.");
        err.status = 404;
        throw err;
    }
}));

// POST /books/:id - Updates book info in the database ansd then redirect to '/'
router.post('/:id', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if(book) {
            await book.update(req.body)
            res.redirect('/');
        } else {
            const err = new Error("We can't seem to find the page you're looking for.");
            err.status = 404;
            throw err;
        }
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            book = await Book.build(req.body);
            res.render('books/update-book', {book, err: err.err, title: 'New Book' })
        } else {
            throw err;
        }
    }
}));

// POST /books/:id/delete - Deletes a book.
router.post('/:id/delete', asyncHandler(async (req ,res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        // Remove the book and then redirect to '/'
        await book.destroy();
        res.redirect("/");
    } else {
        const err = new Error('There was a database error, please try again');
        err.status = 500;
        throw err;
    }
}));

module.exports = router;