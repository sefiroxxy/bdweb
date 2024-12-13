import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db.js";
import { AdminRouter } from "./routes/auth.js";
import { ReviewerRouter } from "./routes/reviewer.js";
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
app.use("/auth", AdminRouter);
app.use("/reviewers", ReviewerRouter);
app.use("/articulos", ArticulosRouter); 
app.use("/comentarios", ComentariosRouter);


// Inicio del servidor
const PORT = process.env.PORT || 3001; // Puerto dinámico si está en producción
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
