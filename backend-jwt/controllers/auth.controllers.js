import { conn } from "../db/database.js"
import { generarJwt } from "../helpers/generar-jwt.js"

export const register = async (req, res) => {
  const { username, password } = req.body;

  // Validación básica
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Insertamos el nuevo usuario
    const [result] = await conn.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, password]
    );
    console.log(  result);
    return res.status(201).json({
      message: "Usuar io registrado con éxito",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    
    const [[user]]= await conn.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    console.log(user);
    // Validación de usuario
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    // Generar token JWT
    const token = await generarJwt(user.id);
    // Almacenar el token en la sesión del servidor
    req.session.token = token;
    // Almacenar el token en una cookie segura
    res.cookie("authToken", token, {
      httpOnly: true, // La cookie no es accesible desde JavaScript
      secure: false, // Cambiar a true en producción con HTTPS
      maxAge: 3600000, // Expiración en milisegundos (1 hora)
    });
    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

export const session = async (req, res) => {
  console.log(req.user);
    return res.json({ message: 'Acceso permitido a área protegida', user: req.user });
};

export const logOut = async (req, res) => {
  try {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }

        res.clearCookie('authToken');
        return res.json({ message: 'Cierre de sesión exitoso' });
    });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error Inesperado' });
}
};
