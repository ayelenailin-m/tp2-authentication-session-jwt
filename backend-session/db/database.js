import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config/config.js";


export const createMyPool = () => {
    try {
        const pool = createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            waitForConnections: true,
            connectionLimit: 10, // Limitar conexiones abiertas
            queueLimit: 0        // Sin limite de conexiones en cola
        });
        console.log("Base de datos conectada");
        return pool;
    } catch (error) {
        console.error("Fallo al crear pool", error);
        throw error; //Se devuelve el error para que el servidor pueda reaccionar
    }
};
const conn = createMyPool()

export { conn };
