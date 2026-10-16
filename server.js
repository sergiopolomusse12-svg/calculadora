
const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

const rutaBD =
    process.env.DATABASE_PATH ||
    path.join(__dirname, "usuarios.db");

const db = new Database(rutaBD);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL UNIQUE,
        contraseña TEXT NOT NULL
    )
`);

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                scriptSrc: [
                    "'self'",
                    "https://kit.fontawesome.com"
                ],
                scriptSrcAttr: ["'none'"]
            }
        }
    })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

app.use(express.static(path.join(__dirname, "public")));

const limiteAutenticacion = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
        mensaje: "Demasiados intentos. Espera 15 minutos e inténtalo de nuevo."
    }
});

app.get("/healthz", (req, res) => {
    res.status(200).send("OK");
});

app.post(
    "/api/registrarse",
    limiteAutenticacion,
    async (req, res) => {
        try {
            const { usuario, contraseña, confirmar } = req.body;

            if (
                typeof usuario !== "string" ||
                typeof contraseña !== "string" ||
                typeof confirmar !== "string"
            ) {
                return res.status(400).json({
                    mensaje: "Debes completar todos los campos."
                });
            }

            const nombreUsuario = usuario.trim();

            if (
                nombreUsuario.length < 3 ||
                nombreUsuario.length > 30
            ) {
                return res.status(400).json({
                    mensaje: "El usuario debe tener entre 3 y 30 caracteres."
                });
            }

            if (
                contraseña.length < 8 ||
                Buffer.byteLength(contraseña, "utf8") > 72
            ) {
                return res.status(400).json({
                    mensaje: "La contraseña debe tener al menos 8 caracteres y no superar los 72 bytes."
                });
            }

            if (contraseña !== confirmar) {
                return res.status(400).json({
                    mensaje: "Las contraseñas no coinciden."
                });
            }

            const contraseñaHash = await bcrypt.hash(contraseña, 12);

            const insertarUsuario = db.prepare(`
                INSERT INTO usuarios (usuario, contraseña)
                VALUES (?, ?)
            `);

            insertarUsuario.run(nombreUsuario, contraseñaHash);

            return res.status(201).json({
                mensaje: "Registro exitoso."
            });
        } catch (error) {
            if (
                error.code === "SQLITE_CONSTRAINT_UNIQUE"
            ) {
                return res.status(409).json({
                    mensaje: "Ese nombre de usuario ya está registrado."
                });
            }

            console.error("Error al registrar usuario:", error);

            return res.status(500).json({
                mensaje: "Ocurrió un error al registrar el usuario."
            });
        }
    }
);

app.post(
    "/api/iniciar-sesion",
    limiteAutenticacion,
    async (req, res) => {
        try {
            const { usuario, contraseña } = req.body;

            if (
                typeof usuario !== "string" ||
                typeof contraseña !== "string" ||
                !usuario.trim() ||
                !contraseña
            ) {
                return res.status(400).json({
                    mensaje: "Debes completar todos los campos."
                });
            }

            const buscarUsuario = db.prepare(`
                SELECT id, usuario, contraseña
                FROM usuarios
                WHERE usuario = ?
            `);

            const cuenta = buscarUsuario.get(usuario.trim());

            if (!cuenta) {
                return res.status(401).json({
                    mensaje: "Usuario o contraseña incorrectos."
                });
            }

            const contraseñaCorrecta = await bcrypt.compare(
                contraseña,
                cuenta.contraseña
            );

            if (!contraseñaCorrecta) {
                return res.status(401).json({
                    mensaje: "Usuario o contraseña incorrectos."
                });
            }

            return res.status(200).json({
                mensaje: "Inicio de sesión exitoso."
            });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);

            return res.status(500).json({
                mensaje: "Ocurrió un error al iniciar sesión."
            });
        }
    }
);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Registrarse.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor disponible en el puerto ${PORT}`);
});
