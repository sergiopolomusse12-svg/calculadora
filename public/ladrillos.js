
function calcular(event) {
    const espesor = parseInt(document.querySelector("#espesor").value);

    let largo = parseFloat(document.querySelector("#largo").value);
    let alto = parseFloat(document.querySelector("#alto").value);

    largo = largo / 100;
    alto = alto / 100;

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
        document.querySelector("#resultado").innerText =
            "Selecciona un espesor de 20 o 30.";
        return;
    }

    document.querySelector("#resultado").innerText =
        `Superficie: ${superficie.toFixed(2)} m²\n` +
        `Cemento: ${cemento.toFixed(2)} kg\n` +
        `Arena: ${arena.toFixed(3)} m³\n` +
        `Ladrillos: ${ladrillos.toFixed(0)}`;
}
