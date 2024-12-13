import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db.js";

import { AdminRouter } from "./routes/auth.js";
import { Admin_SqlRouter} from "./routes/auth_sql.js";
import { ReviewerRouter } from "./routes/reviewer.js";
import { Reviewer_sqlRouter } from "./routes/reviewer_sql.js";
import { ArticulosRouter } from "./routes/articulo.js"; 
import { ComentariosRouter } from "./routes/comentario.js";     


dotenv.config();

const app = express();

// Middleware general
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());

// Rutas
app.use("/auth", Admin_SqlRouter);
app.use("/reviewers", Reviewer_sqlRouter);
app.use("/articulos", ArticulosRouter); 
app.use("/comentarios",ComentariosRouter)

// Inicio del servidor
const PORT = process.env.PORT || 3001; // Puerto dinámico si está en producción
const PORT_sql = process.env.PORT_sql || 3002; // Puerto dinámico si está en producción
app.listen(PORT, () => {
    console.log(`El servidor MongoDB está corriendo en el puerto ${PORT}`);
});
app.listen(PORT_sql, () => {
    console.log(`El servidor SQL está corriendo en el puerto ${PORT_sql}`);
});

