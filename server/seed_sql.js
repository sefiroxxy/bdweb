import bcrypt from "bcrypt";
import { Admin_sql } from "./models/Admin_sql.js";
import "./db_sql.js"; 

async function AdminAccount() {
    try {
        //se verifca si ya existe admin
        const adminCount = await Admin_sql.count({
            where: { username: "admin" }
        });

        if (adminCount === 0) {
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