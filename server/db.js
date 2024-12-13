import mongoose from "mongoose";
import dotenv from "dotenv";
import sequelize from './db_sql.js';

dotenv.config();

const Connection = async () => {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Conectado a MongoDB :)");

        mongoose.connection.on("connected", () => {
            console.log("Conexión establecida con MongoDB.");
        });

        mongoose.connection.on("error", (err) => {
            console.error(`Error en la conexión con MongoDB: ${err.message}`);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("Desconectado de MongoDB.");
        });
    } catch (err) {
        console.error(`Error al conectar con MongoDB: ${err.message}`);
    }
};
Connection();

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
    } catch (error) {
        console.error('Database connection error:', error);
    }
})();


