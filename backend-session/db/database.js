import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config/config.js";

let pool; // Evitamos inicializar directamente

export const createMyPool = () => {
    try {
        pool = createPool({
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
//Exportamos pool inicializado, y no antes de haberlo creado
export { pool };