import bcrypt from "bcrypt";
import { Admin } from "./models/Admin.js";
import "./db.js";

async function AdminAccount() {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashPassword = await bcrypt.hash("123", 10);
            const newAdmin = new Admin({
                username: "admin",
                password: hashPassword,
            });
            await newAdmin.save();
            console.log("Cuenta de administrador creada exitosamente.");
        } else {
            console.log("El usuario administrador ya existe.");
        }
    } catch (err) {
        console.error("Error al crear la cuenta de administrador:", err.message);
    }
}

AdminAccount();
