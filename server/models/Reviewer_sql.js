import { DataTypes } from 'sequelize';
import sequelize from '../db_sql.js';

const Reviewer_sql = sequelize.define('Reviewer', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
});

await sequelize.sync();

export { Reviewer_sql };