import {damePosiciones} from './utiles.mjs';

export function selection(cadena, velocidad, numeroAnimaciones){

    selectionSort(cadena, 0, damePosiciones(cadena), velocidad, numeroAnimaciones)

}

function selectionSort(cadena, start, posiciones, velocidad, numeroAnimaciones){

    let minIndx = start;

    let found = false;

    for(let i = start; i < cadena.length; i++) {

        if(cadena[minIndx] > cadena[i]){

            minIndx = i;

        }

        if(i != cadena.length -1){

            found = true;

        }

    }

    if(found) {

        let valor = cadena[minIndx];

        cadena.splice(minIndx, 1);

        cadena.splice(start, 0, valor);

        animacionSelectionSort(cadena, minIndx, start, posiciones, valor, velocidad, numeroAnimaciones);

    }else setTimeout(
        function()
        {
            $("#status").html("Ready")
        }, parseInt(numeroAnimaciones) * parseInt(velocidad));

}

function animacionSelectionSort(cadena, minIndx, start, posiciones, valorEscogido, velocidad, numeroAnimaciones){

    for(let i = 0; i < cadena.length; i++){

        let hacia = (100 * parseInt(truncate(posiciones[i], 2)) / window.innerWidth).toString() + "vw";

        let color = $( "#f"+cadena[i]).css("background-color")

        if(cadena[i] == valorEscogido){


            $( "#f"+cadena[i]).animate({
                left: hacia,
                "background-color": "#36682E",
            }, parseInt(velocidad));

        }

        $( "#f"+cadena[i]).animate({
            left: hacia,
            "background-color": color,
        }, parseInt(velocidad));


    }

    selectionSort(cadena, start + 1, posiciones, velocidad, numeroAnimaciones+1);
}

function truncate(str, n){
    return str.substring(0, str.length - n);
};
