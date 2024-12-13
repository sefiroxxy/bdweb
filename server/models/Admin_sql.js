import { DataTypes } from 'sequelize';
import sequelize from '../db_sql.js'; // Se importara la conexion

const Admin_sql = sequelize.define('Admin', {
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

export { Admin_sql };