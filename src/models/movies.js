'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      models.Movie.belongsToMany(models.User, {
        through: 'userMovie',
        as: 'movieFavorites',
        foreignKey: 'id'
      });
    }
  }

  Movie.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    display_title: {
      type: DataTypes.STRING
    },
    mpaa_rating: {
      type: DataTypes.STRING
    },
    critics_pick: {
      type: DataTypes.INTEGER
    },
    byline: {
      type: DataTypes.STRING
    },
    headline: {
      type: DataTypes.STRING
    },
    summary_short: {
      type: DataTypes.TEXT
    },
    publication_date: {
      type: DataTypes.DATEONLY
    },
    opening_date: {
      type: DataTypes.DATEONLY
    },
    date_updated: {
      type: DataTypes.DATE
    },
    link_url: {
      type: DataTypes.STRING
    },
    link_suggested_text: {
      type: DataTypes.STRING
    },
    multimedia_type: {
      type: DataTypes.STRING
    },
    multimedia_src: {
      type: DataTypes.STRING
    },
    multimedia_height: {
      type: DataTypes.INTEGER
    },
    multimedia_width: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Movie'
  });

  return Movie;
};
