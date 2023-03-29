const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "sergio",
    "sergio",
    "sergio",
    {
        host: 'localhost',
        dialect: 'postgres',
    }
)

module.exports = sequelize;