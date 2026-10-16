
async function Iniciodesesion() {
    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("contraseña").value;

    if (usuario === "" || contraseña === "") {
        alert("Rellene todos los campos");
        return;
    }

    try {
        const respuesta = await fetch("/api/iniciar-sesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, contraseña })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            alert(resultado.mensaje || "Usuario o contraseña incorrectos.");
            return;
        }

        location.href = "/calculadora2.html";
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("No se pudo conectar con el servidor.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btnIniciarSesion");

    if (boton) {
        boton.addEventListener("click", Iniciodesesion);
    } else {
        console.error("No se encontró el botón de inicio de sesión.");
    }
});
