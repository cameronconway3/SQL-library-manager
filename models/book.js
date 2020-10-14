'use strict';
const { Sequelize, Model } = require('sequelize');

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