function calcular_techo() {
    const espesor = parseFloat(document.querySelector("#espesorTecho").value);
    const ancho = parseFloat(document.querySelector("#anchoTecho").value);
    const largo = parseFloat(document.querySelector("#largoTecho").value);
    const resultado = document.querySelector("#resultadoTecho");

    if (
        !Number.isFinite(espesor) || espesor <= 0 ||
        !Number.isFinite(ancho) || ancho <= 0 ||
        !Number.isFinite(largo) || largo <= 0
    ) {
        resultado.innerText = "Ingresa valores mayores que cero en todos los campos.";
        return;
    }

    const area = ancho * largo;
    const volumen = area * espesor;

    const cemento = area * 33;
    const arena = area * 0.072;
    const piedra = area * 0.072;
    const hierro8 = area * 7;
    const hierro6 = area * 4;

    resultado.innerText =
        `Área del techo: ${area.toFixed(2)} m²\n` +
        `Volumen del techo: ${volumen.toFixed(3)} m³\n` +
        `Cemento: ${cemento.toFixed(2)} kg\n` +
        `Arena: ${arena.toFixed(3)} m³\n` +
        `Piedra: ${piedra.toFixed(3)} m³\n` +
        `Hierro del 8: ${hierro8.toFixed(2)} m\n` +
        `Hierro del 6: ${hierro6.toFixed(2)} m`;
}

document.querySelector("#btnCalcularTecho")
    .addEventListener("click", calcular_techo);
