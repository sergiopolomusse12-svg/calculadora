function calcular() {
    const espesor = parseInt(document.querySelector("#espesor").value);
    const largoCm = parseFloat(document.querySelector("#largo").value);
    const altoCm = parseFloat(document.querySelector("#alto").value);
    const resultado = document.querySelector("#resultado");

    if (
        !Number.isFinite(largoCm) ||
        !Number.isFinite(altoCm) ||
        largoCm <= 0 ||
        altoCm <= 0
    ) {
        resultado.innerText = "Ingresa un largo y un alto mayores que cero.";
        return;
    }

    const largo = largoCm / 100;
    const alto = altoCm / 100;
    const superficie = largo * alto;

    let cemento;
    let arena;
    let ladrillos;

    if (espesor === 20) {
        cemento = superficie * 10.9;
        arena = superficie * 0.09;
        ladrillos = superficie * 90;
    } else if (espesor === 30) {
        cemento = superficie * 15.2;
        arena = superficie * 0.115;
        ladrillos = superficie * 120;
    } else {
        resultado.innerText = "Selecciona un espesor válido.";
        return;
    }

    resultado.innerText =
        `Superficie: ${superficie.toFixed(2)} m²\n` +
        `Cemento: ${cemento.toFixed(2)} kg\n` +
        `Arena: ${arena.toFixed(3)} m³\n` +
        `Ladrillos: ${Math.ceil(ladrillos)}`;
}

document.querySelector("#btnCalcular").addEventListener("click", calcular);
