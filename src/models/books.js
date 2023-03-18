'use strict'
const { Model } = require ('sequelize');
module.exports = (seuqelize, DataTypes) => {
    class books extends Model{
static associate(models) {
    models.books.belongsToMany(models.user, {
        through: 'userBook',
        as: 'bookFavouirtes',
        foreingKey: 'bookId'
    });
}
    }
    books.init({
        id:{

        }
    })
}