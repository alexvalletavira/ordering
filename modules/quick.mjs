import {almacenarColores, consultarColor, damePosiciones, pxToVw} from './utiles.mjs';

export function quick(cadena, velocidad){

    quickSort(cadena, velocidad);

}

function quickSort(cadena, velocidad){

    let cadenaAnimaciones = [];

    let posiciones = damePosiciones(cadena)

    let segments = [];

    segments.push(new Segment(0, cadena.length - 1));

    while(segments.length != 0) {

        segments[0].escogerPivot(cadena, posiciones, cadenaAnimaciones);

        while (true) {

            if(checkSwapping(cadena, segments, posiciones, cadenaAnimaciones) === false) break;

        }

        if(segments[0].start < segments[0].pivot - 1) segments.push(new Segment(segments[0].start, segments[0].pivot - 1));

        if(segments[0].pivot < segments[0].end) segments.push(new Segment(segments[0].pivot, segments[0].end));

        segments.shift();

    }

    let cadenaColores = almacenarColores(cadena);

    anima(cadenaAnimaciones, 0, cadenaColores, velocidad, 0)
}


class Segment{

    constructor(start, end){

        this.start = start;
        this.end = end;

    }

    escogerPivot(cadena, posiciones, cadenaAnimaciones){

        this.pivot = Math.round((this.end - this.start) / 2) + this.start

        let num1 = cadena[this.start];
        let num2 = cadena[this.end];
        let num3 = cadena[this.pivot];

        cadena[this.start] = Math.min(num1, num2, num3);
        cadena[this.end] = Math.max(num1, num2, num3);

        if(Math.max(num1, num2, num3) != num1 && Math.min(num1, num2, num3) != num1) cadena[this.pivot] = num1;

        if(Math.max(num1, num2, num3) != num2 && Math.min(num1, num2, num3) != num2) cadena[this.pivot] = num2;

        if(Math.max(num1, num2, num3) != num3 && Math.min(num1, num2, num3) != num3) cadena[this.pivot] = num3;

        cadenaAnimaciones.push("triple");

        cadenaAnimaciones.push("#f"+cadena[this.start], posiciones[cadena.indexOf(cadena[this.start])])
        cadenaAnimaciones.push("#f"+cadena[this.end],  posiciones[cadena.indexOf(cadena[this.end])])
        cadenaAnimaciones.push("#f"+cadena[this.pivot], posiciones[cadena.indexOf(cadena[this.pivot])])

        cadenaAnimaciones.push("#f"+cadena[this.pivot], "#5576BD");
        cadenaAnimaciones.push("#f"+cadena[this.pivot], "#5576BD");

    }

}

function intercambiarLugares(cadena, x , y, posiciones, segments, cadenaAnimaciones){

    let dummy = cadena[x];
    cadena[x] = cadena[y];
    cadena[y] = dummy;

    cadenaAnimaciones.push("#f"+cadena[x], posiciones[x])
    cadenaAnimaciones.push("#f"+cadena[y], posiciones[y])

}

function checkSwapping(cadena, segments, posiciones, cadenaAnimaciones){

    let pointerLeft = segments[0].start;
    let pointerRight = segments[0].end;
    let pivot = cadena[segments[0].pivot];

    while (cadena[pointerLeft] < pivot) {

        if (pointerLeft < pointerRight) pointerLeft++;
        else break;
        if (cadena[pointerLeft] > pivot) break;

    }

    while (cadena[pointerRight] > pivot) {

        if (pointerLeft < pointerRight) pointerRight--;
        else break;
        if (cadena[pointerRight] < pivot) break;

    }

    if (cadena[pointerRight] < cadena[pointerLeft]) intercambiarLugares(cadena, pointerLeft, pointerRight, posiciones, segments, cadenaAnimaciones);
    else return false;

}

function anima(cadenaAnimaciones, indx, cadenaColores, velocidad, numeroAnimaciones) {

    numeroAnimaciones++;

    if(cadenaAnimaciones[indx] === "triple"){

        indx++;

        for(let i = 0; i < 3; i++){

            let id = cadenaAnimaciones[indx];

            let valor = cadenaAnimaciones[indx + 1]

            valor = pxToVw(valor);

            let color =  consultarColor(id, cadenaColores);

            $(id).css("background-color", "#52D6DA")

            $(id).animate({
                "left": valor,
                "background-color": color,
            }, velocidad,function () {

                if(i === 2) anima(cadenaAnimaciones, indx+2, cadenaColores, velocidad, numeroAnimaciones);

            });

            indx += 2;
        }


    }else {

        let id = cadenaAnimaciones[indx];

        let valor = cadenaAnimaciones[indx + 1];

        if (valor == "#5576BD") {

            $(id).css("background-color", "#5576BD")

            let color = consultarColor(id, cadenaColores);

            $(id).animate({
                "background-color": valor,
            }, velocidad, function () {

                $(id).animate({
                    "background-color": color
                }, velocidad, function () {

                    if (indx < cadenaAnimaciones.length - 2) anima(cadenaAnimaciones, indx + 2, cadenaColores, velocidad, numeroAnimaciones)
                    else setTimeout(
                        function()
                        {
                            $("#status").html("Ready")
                        }, parseInt(numeroAnimaciones) * parseInt(velocidad));

                });

            });


        } else {

            if (!(valor === $(id).css("left"))) {

                let color = consultarColor(id, cadenaColores);

                $(id).css("background-color", "#36682E")

                valor = pxToVw(valor);

                $(id).animate({
                    "left": valor,
                    "background-color": color,
                }, velocidad);

            }

            indx += 2;

            if (!(valor === $(id).css("left"))) {

                id = cadenaAnimaciones[indx];

                valor = cadenaAnimaciones[indx + 1]

                valor = pxToVw(valor);

                let color = consultarColor(id, cadenaColores);

                $(id).css("background-color", "#36682E")

                $(id).animate({
                    "left": valor,
                    "background-color": color,
                }, velocidad, function () {

                    if (indx < cadenaAnimaciones.length - 2) anima(cadenaAnimaciones, indx + 2, cadenaColores, velocidad, numeroAnimaciones);
                    else setTimeout(
                        function()
                        {
                            $("#status").html("Ready")
                        }, parseInt(numeroAnimaciones) * parseInt(velocidad));

                });

            } else if (indx < cadenaAnimaciones.length - 2) anima(cadenaAnimaciones, indx + 2, cadenaColores, velocidad, numeroAnimaciones);
                    else setTimeout(
                            function()
                            {
                                $("#status").html("Ready")
                            }, parseInt(numeroAnimaciones) * parseInt(velocidad));

        }

    }


}


