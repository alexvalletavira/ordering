export function switching(cadena, velocidad) {

    for (let i = 0; i < cadena.length - 1; i++) {

        if (cadena[i] > cadena[i + 1]) {

            let hacia1 = $("#f" + cadena[i + 1]).css("left");

            let hacia2 = $("#f" + cadena[i]).css("left");

            animacionSwitching(cadena[i], cadena[i + 1], hacia1, hacia2, cadena, velocidad);

            let dummy = cadena[i + 1];

            cadena[i + 1] = cadena[i];

            cadena[i] = dummy;

            break;

        }

        if(i === cadena.length - 2) $("#status").html("Ready")

    }



}


function animacionSwitching(id, id2, lugar, lugar2, cadena, velocidad) {

    lugar = (100 * parseInt(truncate(lugar, 2)) / window.innerWidth).toString() + "vw";

    lugar2 = (100 * parseInt(truncate(lugar2, 2)) / window.innerWidth).toString() + "vw";

    let color = $("#f" + id).css("background-color");

    let color2 = $("#f" + id2).css("background-color");

    $("#f" + id).css({"background-color": "#36682E"});

    $("#f" + id2).css({"background-color": "#36682E"});

    $("#f" + id).animate({
        left: lugar,
        "background-color": color,

    }, parseInt(velocidad));

    $("#f" + id2).animate({
        left: lugar2,
        "background-color": color2,
    }, parseInt(velocidad), function () {
        switching(cadena, velocidad)
    })

}

function truncate(str, n) {
    return str.substring(0, str.length - n);
}



