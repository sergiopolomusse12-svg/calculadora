function calcular_contrapiso() {
    const espesor = parseFloat(document.querySelector("#espesorContrapiso").value);
    const ancho = parseFloat(document.querySelector("#anchoContrapiso").value);
    const largo = parseFloat(document.querySelector("#largoContrapiso").value);
    const resultado = document.querySelector("#resultadoContrapiso");

    if (
        !Number.isFinite(espesor) || espesor <= 0 ||
        !Number.isFinite(ancho) || ancho <= 0 ||
        !Number.isFinite(largo) || largo <= 0
    ) {
        resultado.innerText = "Ingresa valores mayores que cero en todos los campos.";
        return;
    }

    const volumen = espesor * ancho * largo;
    const cemento = volumen * 105;
    const arena = volumen * 0.45;
    const piedra = volumen * 0.9;

    resultado.innerText =
        `Volumen: ${volumen.toFixed(3)} m³\n` +
        `Cemento: ${cemento.toFixed(2)} kg\n` +
        `Arena: ${arena.toFixed(3)} m³\n` +
        `Piedra: ${piedra.toFixed(3)} m³`;
}

document.querySelector("#btnCalcularContrapiso")
    .addEventListener("click", calcular_contrapiso);

