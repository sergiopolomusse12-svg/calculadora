function calcular_pisos() {
    const ancho = parseFloat(document.querySelector("#anchoPiso").value);
    const largo = parseFloat(document.querySelector("#largoPiso").value);
    const resultado = document.querySelector("#resultadoPiso");

    if (
        !Number.isFinite(ancho) ||
        !Number.isFinite(largo) ||
        ancho <= 0 ||
        largo <= 0
    ) {
        resultado.innerText = "Ingresa un ancho y un largo mayores que cero.";
        return;
    }

    const superficie = ancho * largo;
    const extra = superficie * 0.10;
    const superficieTotal = superficie + extra;

    resultado.innerText =
        `Superficie del piso: ${superficie.toFixed(2)} m²\n` +
        `Extra para recortes (10%): ${extra.toFixed(2)} m²\n` +
        `Total necesario: ${superficieTotal.toFixed(2)} m²`;
}

document.querySelector("#btnCalcularPisos")
    .addEventListener("click", calcular_pisos);
