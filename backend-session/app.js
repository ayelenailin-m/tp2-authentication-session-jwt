import express from "express";
import { configureMiddlewares } from "./middlewares/middlewares.js";
import { registerRoutes } from "./routers/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Configurar middlewares
configureMiddlewares(app);

// Registrar rutas
registerRoutes(app);

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/`)
);
