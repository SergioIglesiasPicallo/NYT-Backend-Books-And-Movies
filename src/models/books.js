'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      models.Book.belongsToMany(models.User, {
        through: 'userBook',
        as: 'bookFavorites',
        foreignKey: 'bookId'
      });
    }
  }
  Book.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING
    },
    publicationDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    isbn: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    coverUrl: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Book'
  });

  return Book;
};

 