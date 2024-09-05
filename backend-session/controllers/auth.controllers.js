import { conn } from "../db/database.js";


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
    console.log(result);
    return res.status(201).json({
      message: "Usuario registrado con éxito",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await conn.query("SELECT * FROM users WHERE username= ?", [
      username,
    ]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Guardamos la información del usuario en la sesion
    req.session.userId = user[0].id;
    req.session.username = user[0].username;

    return res.json({
      message: "Inicio de sesión exitoso",
      user: { id: user[0].id, username: user[0].username },
    });
  } catch (error) {
    console.error("Error en el login", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const session = async (req, res) => {
  if (req.session.userId) {
    return res.json({
      loggedIn: true,
      user: { id: req.session.userId, username: req.session.username },
    });
  } else {
    return res
      .status(401)
      .json({ loggedIn: false, message: "No hay sesión activa" });
  }
};

export const logOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar la sesión" });
    }
    res.clearCookie("connect.sid"); // Nombre de cookie por defecto para express-session
    return res.json({ message: "Sesión cerrada exitosamente" });
  });
};
