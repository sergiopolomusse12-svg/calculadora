
function calcular_pintura() {
    const superficie = parseFloat(
        document.querySelector("#superficiePintura").value
    );

    const resultado = document.querySelector("#resultadoPintura");

    if (!Number.isFinite(superficie) || superficie <= 0) {
        resultado.innerText = "Ingresa una superficie mayor que cero.";
        return;
    }

    const pintura = superficie / 6;

    resultado.innerText =
        `Superficie del muro: ${superficie.toFixed(2)} m²\n` +
        `Pintura necesaria: ${pintura.toFixed(2)} litros`;
}

document.querySelector("#btnCalcularPintura")
    .addEventListener("click", calcular_pintura);
