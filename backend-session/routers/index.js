import { router as authRouter } from "./auth.routes.js";
// Importar más routers aquí si es necesario

export const registerRoutes = (app) => {
    // Autenticación
    app.use("/auth", authRouter);

    // Más rutas futuras
    // app.use("/users", userRouter);
};
