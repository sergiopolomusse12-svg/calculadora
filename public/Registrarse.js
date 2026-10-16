
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btnRegistrar");

    if (!boton) {
        console.error("No se encontró el botón btnRegistrar.");
        return;
    }

    boton.addEventListener("click", Registrar);
});

async function Registrar() {
    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("contraseña").value;
    const confirmar = document.getElementById("confirmar-contraseña").value;

    if (!usuario || !contraseña || !confirmar) {
        alert("Debes rellenar todos los campos.");
        return;
    }

    if (usuario.length < 3 || usuario.length > 30) {
        alert("El usuario debe tener entre 3 y 30 caracteres.");
        return;
    }

    if (contraseña.length < 8 || contraseña.length > 72) {
        alert("La contraseña debe tener entre 8 y 72 caracteres.");
        return;
    }

    if (contraseña !== confirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {
        const respuesta = await fetch("/api/registrarse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                contraseña,
                confirmar
            })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            alert(resultado.mensaje || "No se pudo completar el registro.");
            return;
        }

        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        window.location.href = "/index.html";

    } catch (error) {
        console.error("Error al registrar:", error);
        alert("No se pudo conectar con el servidor.");
    }
}
