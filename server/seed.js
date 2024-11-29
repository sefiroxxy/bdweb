import express from 'express'
import bcrypt from 'bcrypt'
import { Admin } from './models/Admin.js'
import './db.js'

async function AdminAccount() {
    try {
        const amdinCount = await Admin.countDocuments()
        if (amdinCount === 0) {
            const hashPassword = await bcrypt.hash('123', 10)
            const newAmdin = new Admin({
                username: 'admin',
                password: hashPassword
            })
            await newAmdin.save()
            console.log("Cuenta Creada")
        } else {
            console.log("El usuario ya existe")
        }
    } catch (err) {
        console.log("Error")
    }
}

AdminAccount()