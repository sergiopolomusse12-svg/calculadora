function calcular_contrapiso(event) {
    const espesor = parseFloat(document.querySelector("#espesorContrapiso").value);
    const ancho = parseFloat(document.querySelector("#anchoContrapiso").value);
    const largo = parseFloat(document.querySelector("#largoContrapiso").value);

    const volumen = espesor * ancho * largo;
    const cemento = volumen * 105;
    const arena = volumen * 0.45;
    const piedra = volumen * 0.9;

    document.querySelector("#resultadoContrapiso").innerText =
        `Volumen: ${volumen.toFixed(3)} m³\n` +
        `Cemento: ${cemento.toFixed(2)} kg\n` +
        `Arena: ${arena.toFixed(3)} m³\n` +
        `Piedra: ${piedra.toFixed(3)} m³`;
}
