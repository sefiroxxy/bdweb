import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bdwebfinal', 'root', 'Operation123@', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
});

export default sequelize;