
function calcular_viga() {
    const largo = parseFloat(document.querySelector("#largoViga").value);
    const resultado = document.querySelector("#resultadoViga");

    if (!Number.isFinite(largo) || largo <= 0) {
        resultado.innerText = "Ingresa un largo mayor que cero.";
        return;
    }

    const cemento = largo * 9;
    const arena = largo * 0.02;
    const piedra = largo * 0.02;
    const hierro8 = largo * 4;
    const hierro4 = largo * 3;

    resultado.innerText =
        `Cemento: ${cemento.toFixed(2)} kg\n` +
        `Arena: ${arena.toFixed(3)} m³\n` +
        `Piedra: ${piedra.toFixed(3)} m³\n` +
        `Hierro del 8: ${hierro8.toFixed(2)} m\n` +
        `Hierro del 4: ${hierro4.toFixed(2)} m`;
}

document.querySelector("#btnCalcularViga")
    .addEventListener("click", calcular_viga);
