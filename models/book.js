'use strict';
const { Sequelize, Model } = require('sequelize');

// Set up model for Book
module.exports = sequelize => {
    class Book extends Model {}
    Book.init({
        // Title is a string and must not be empty
        title: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        // Author is a string and must not be empty
        author: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        // Genre is a string
        genre: {
            type: Sequelize.STRING,
        },
        // Year is an integer
        year: {
            type: Sequelize.INTEGER,
        }
    }, { sequelize });

    return Book;
};