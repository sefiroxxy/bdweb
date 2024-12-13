import bcrypt from "bcrypt";
import { Admin_sql } from "./models/Admin_sql.js"; // Assuming you have an Admin_sql model
import "./db_sql.js"; // Your database connection setup

async function AdminAccount() {
    try {
        // Check if the admin user already exists
        const adminCount = await Admin_sql.count({
            where: { username: "admin" }
        });

        if (adminCount === 0) {
            // Create a new admin user with a hashed password
            const hashPassword = await bcrypt.hash("123", 10);
            await Admin_sql.create({
                username: "admin",
                password: hashPassword,
            });
            console.log("Cuenta de administrador creada exitosamente.");
        } else {
            console.log("El usuario administrador ya existe.");
        }
    } catch (err) {
        console.error("Error al crear la cuenta de administrador:", err.message);
    }
}

AdminAccount();