
const express = require("express");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const db = new Database(path.join(__dirname, "usuarios.db"));

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL UNIQUE,
        contraseña TEXT NOT NULL
    )
`);

const limitarIntentos = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false
});

app.post("/api/registrarse", limitarIntentos, async (req, res) => {
    try {
        const { usuario, contraseña, confirmar } = req.body;

        if (
            typeof usuario !== "string" ||
            typeof contraseña !== "string" ||
            typeof confirmar !== "string"
        ) {
            return res.status(400).json({
                mensaje: "Debes rellenar todos los campos."
            });
        }

        const nombre = usuario.trim();

        if (nombre.length < 3 || nombre.length > 30) {
            return res.status(400).json({
                mensaje: "El usuario debe tener entre 3 y 30 caracteres."
            });
        }

        if (contraseña.length < 8 || contraseña.length > 72) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener entre 8 y 72 caracteres."
            });
        }

        if (contraseña !== confirmar) {
            return res.status(400).json({
                mensaje: "Las contraseñas no coinciden."
            });
        }

        const hash = await bcrypt.hash(contraseña, 12);

        db.prepare(`
            INSERT INTO usuarios (usuario, contraseña)
            VALUES (?, ?)
        `).run(nombre, hash);

        return res.status(201).json({
            mensaje: "Registro exitoso. Ya puedes iniciar sesión."
        });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                mensaje: "Ese nombre de usuario ya está registrado."
            });
        }

        console.error(error);
        return res.status(500).json({
            mensaje: "Ocurrió un error al registrar el usuario."
        });
    }
});

app.post("/api/iniciar-sesion", limitarIntentos, async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;

        if (
            typeof usuario !== "string" ||
            typeof contraseña !== "string" ||
            usuario.length > 30 ||
            contraseña.length > 72
        ) {
            return res.status(400).json({
                mensaje: "Usuario o contraseña incorrectos."
            });
        }

        const cuenta = db.prepare(`
            SELECT id, usuario, contraseña
            FROM usuarios
            WHERE usuario = ?
        `).get(usuario.trim());

        if (!cuenta || !(await bcrypt.compare(contraseña, cuenta.contraseña))) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos."
            });
        }

        return res.json({
            mensaje: "Inicio de sesión correcto.",
            usuario: cuenta.usuario
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Ocurrió un error al iniciar sesión."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor disponible en el puerto ${PORT}`);
});