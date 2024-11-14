const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require("dotenv").config();

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  const { email, password, name } = req.body; // Asegúrate de incluir 'name'
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3)",
      [email, hashedPassword, name]
    );
    res.status(201).send("Usuario registrado");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar usuario");
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (
    user.rows.length === 0 ||
    !(await bcrypt.compare(password, user.rows[0].password))
  ) {
    return res.status(401).send("Credenciales inválidas");
  }

  const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

// Función para enviar el correo de bienvenida
async function sendWelcomeEmail(email) {
  const msg = {
    to: email,
    from: "tu_correo@example.com",
    subject: "Bienvenido a la aplicación",
    text: "Gracias por registrarte en nuestra aplicación.",
  };
  await sgMail.send(msg);
}

// Nueva función para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows); // Devuelve los usuarios en formato JSON
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener los usuarios");
  }
};
