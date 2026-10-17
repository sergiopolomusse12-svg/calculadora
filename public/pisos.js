function calcular_pisos(event) {
    const ancho = parseFloat(document.querySelector("#anchoPiso").value);
    const largo = parseFloat(document.querySelector("#largoPiso").value);

    const superficie = ancho * largo;
    const superficie_final = superficie * 1.10;

    document.querySelector("#resultadoPiso").innerText =
        `Superficie: ${superficie.toFixed(2)} m²\n` +
        `Superficie con 10% extra: ${superficie_final.toFixed(2)} m²`;
}
