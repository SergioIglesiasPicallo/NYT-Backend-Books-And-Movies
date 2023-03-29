'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Book, {
                through: 'book_user',
                as: 'UserPosts',
                foreignKey: 'user_FK',
                otherKey: 'post_FK'
            });

            User.belongsTo(models.Movie, {
                through: 'movie_user',
                as: 'UserMovie',
                foreignKey: 'user_FK',
                otherKey: 'post_FK'
            });
      
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
            },
            salt: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'User',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    );
    return User;
};
