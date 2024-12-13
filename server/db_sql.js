import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bdwebfinal', 'root', 'Operation123@', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres'
    port: 3306, // MySQL default port
    logging: false,
});

export default sequelize; // Default export