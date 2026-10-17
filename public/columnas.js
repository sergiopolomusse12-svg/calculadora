function calcular_columna() {
    const largo = parseFloat(document.querySelector("#largoColumna").value);
    const resultado = document.querySelector("#resultadoColumna");

    if (!Number.isFinite(largo) || largo <= 0) {
        resultado.innerText = "Ingresa un largo mayor que cero.";
        return;
    }

    const cemento = largo * 7.5;
    const arena = largo * 0.016;
    const piedra = largo * 0.016;
    const hierro10 = largo * 6;
    const hierro4 = largo * 3;

    resultado.innerText =
        `Cemento: ${cemento.toFixed(2)} kg\n` +
        `Arena: ${arena.toFixed(3)} m³\n` +
        `Piedra: ${piedra.toFixed(3)} m³\n` +
        `Hierro del 10: ${hierro10.toFixed(2)} m\n` +
        `Hierro del 4: ${hierro4.toFixed(2)} m`;
}

document.querySelector("#btnCalcular").addEventListener("click", calcular_columna);

