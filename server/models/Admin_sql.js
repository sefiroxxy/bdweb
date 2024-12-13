import { DataTypes } from 'sequelize';
import sequelize from '../db_sql.js'; // Import your database connection

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
    // Additional model options can be added here
});

// Sync the model with the database
await sequelize.sync(); // Ensure that this is called in an appropriate context

export { Admin_sql };