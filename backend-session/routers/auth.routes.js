import { register, login, session, logOut } from "../controllers/auth.controllers.js"; 
import { Router } from "express";

const router = Router();

// Rutas
router.post("/register", register) //Ruta para registrar un nuevo usuario
router.post("/login", login); // Ruta para iniciar sesión
router.get("/session", session); // Ruta para verificar si la sesión está activa
router.post("/logout", logOut); // Ruta para cerrar sesión

export { router }; // Exportamos el router para que sea utilizado en el servidor principal
