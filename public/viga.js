function calcular_viga(event) {
    const largo = parseFloat(document.querySelector("#largoViga").value);

    const cemento = largo * 9;
    const arena = largo * 0.02;
    const piedra = largo * 0.02;
    const hierro8 = largo * 4;
    const hierro4 = largo * 3;

    document.querySelector("#resultadoViga").innerText =
        `Cemento: ${cemento.toFixed(2)} kg\n` +
        `Arena: ${arena.toFixed(2)} m³\n` +
        `Piedra: ${piedra.toFixed(2)} m³\n` +
        `Hierro del 8: ${hierro8.toFixed(2)} m\n` +
        `Hierro del 4: ${hierro4.toFixed(2)} m`;
}
