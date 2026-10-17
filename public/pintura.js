function calcular_pintura(event) {
    const superficie = parseFloat(
        document.querySelector("#superficiePintura").value
    );

    const pintura = superficie / 6;

    document.querySelector("#resultadoPintura").innerText =
        `Superficie del muro: ${superficie.toFixed(2)} m²\n` +
        `Pintura necesaria: ${pintura.toFixed(2)} litros`;
}
