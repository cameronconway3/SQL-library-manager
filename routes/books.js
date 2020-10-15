const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

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
    if(req.query.page) {
        const allBooks = await Book.findAll({order: [['createdAt', 'DESC']]});
    
        let numOfBooks = allBooks.length;
        let booksPerPage = 5;
    
        numOfPages = Math.ceil(numOfBooks/booksPerPage)
    
        let page = req.query.page;
            
        const books = await Book.findAll({ 
            order: [['createdAt', 'DESC']],
            offset: ((page-1) * booksPerPage), 
            limit: booksPerPage
    
        });
    
        res.render('books/index', {books, booksPerPage: 5, numOfBooks: allBooks.length, title: "Books" });
    }
    else {
        const books = await Book.findAll({order: [['createdAt', 'DESC']], title: "Books" });
        res.render('books/index', {books});
    }
}));

// POST /books - Shows a list of the books matching the search value
router.post('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll({
        where: {
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
        res.redirect(`/books/${book.id}`);
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            res.render("books/new-book", {book, err: err.errors, title: "New Book" })
        } else {
            console.log("thowing errror")
            throw err;
        }
    }
}));

// GET /books/:id - Shows book detail form
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

// POST /books/:id - Updates book info in the database
router.post('/:id', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if(book) {
            await book.update(req.body)
            res.redirect('/');
        } else {
            const err = new Error('Sorry, there is no book with that ID. Please try again.');
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
        await book.destroy();
        res.redirect("/");
    } else {
        const err = new Error('There was a database error, please try again');
        err.status = 500;
        throw err;
    }
}));


module.exports = router;