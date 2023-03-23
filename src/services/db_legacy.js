import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    "sergio",
    "sergio",
    "sergio",
    {
        host: 'localhost',
        dialect: 'postgres',
    }
)

export default sequelize;