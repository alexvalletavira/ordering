import {damePosiciones} from "./utiles.mjs";

export function bubble(cadena, start, velocidad){

    let posiciones = damePosiciones(cadena);

    let ok = true;

    for(let i = 0; i < cadena.length - 1; i++){

        if(cadena[i] > cadena[i + 1]){

            ok = false;

            if(i >= start) {

                let dummy = cadena[i + 1];

                cadena[i + 1] = cadena[i];

                cadena[i] = dummy;

                animacionSwitching(i, i + 1, cadena, posiciones, velocidad);

                break;

            }

        }

        if(!ok && i === cadena.length - 2) bubble(cadena, 0, velocidad);

        if(ok && i === cadena.length - 2) $("#status").html("Ready")
    }

}


function animacionSwitching(id, id2, cadena, posiciones, velocidad){

    let lugar = pxToVw(posiciones[id]);

    let lugar2 = pxToVw(posiciones[id2])

    let color = $( "#f"+cadena[id]).css("background-color")

    let color2 = $( "#f"+cadena[id2]).css("background-color")

    $( "#f"+cadena[id]).css({"background-color": "#36682E"})

    $( "#f"+cadena[id2]).css({"background-color": "#36682E"})

    $( "#f"+cadena[id]).animate({
        left: lugar,
        "background-color": color,

    }, parseInt(velocidad))

    $( "#f"+cadena[id2]).animate({
        left: lugar2,
        "background-color": color2,
    }, parseInt(velocidad), function() {

        bubble(cadena, id < cadena.length - 1 ? id : 0, velocidad)
    })

}

function truncate(str, n){
    return str.substring(0, str.length - n);
};

export function pxToVw(str){

    return (100 * parseInt(truncate(str, 2)) / window.innerWidth).toString() + "vw";

}
