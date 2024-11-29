import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const Connection = async () => {
    try {
        mongoose.connect(process.env.URL)
        console.log("Conectado :)")
    } catch (err) {
        console.log("Error: " + err)
    }
}

Connection()