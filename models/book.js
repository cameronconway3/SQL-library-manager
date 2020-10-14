'use strict';
const { Sequelize, Model } = require('sequelize');

// Connect to a SQLite Database
const sequelize = new Sequelize({
    // Specifies the specific version of SQL you're using.
    dialect: 'sqlite',
    // Will create a databse in your project named 'movies'.
    storage: 'movies.db',
    // Stop SQL logging
    logging: false
});

module.exports = sequelize => {
    
    class Book extends Model {}
    Book.init({
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        genre: {
            type: Sequelize.STRING,
        },
        year: {
            type: Sequelize.INTEGER,
        }
    }, { sequelize });

    return Book;
};