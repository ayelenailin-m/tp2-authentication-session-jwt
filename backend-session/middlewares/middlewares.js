import cors from "cors";
import morgan from "morgan";
import express from "express";
import session from "express-session";
import path from "path";

const __dirname = path.resolve();

// Configuración de middlewares
export const configureMiddlewares = (app) => {
    // CORS
    // app.use(
    //     cors({
    //         origin: ["http://localhost:3000"],
    //         methods: ["GET", "POST", "PUT", "DELETE"],
    //         credentials: true,
    //     })
    // );
    app.use(cors({
        origin:["http://localhost:3000"]
    }))
    // Morgan
    app.use(morgan("dev"));

    // JSON parsing
    app.use(express.json());

    // Archivos estáticos
    app.use(express.static(path.join(__dirname, "public")));

    // Sesiones
    app.use(
        session({
            secret: "mi_secreto",
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                httpOnly: true,
            },
        })
    );
};
