import {damePosiciones, pxToVw, consultarColor, almacenarColores} from "./utiles.mjs";


export function merge(cadena, velocidad){

    mergeOrdering(cadena, velocidad)

}

function mergeOrdering(cadena, velocidad){

    let cadenaAnimaciones = preparaCadenaAnimaciones(cadena)

    let posiciones = damePosiciones(cadena);

    let divisiones = [];

    dividir(cadena, divisiones);

    let resultadoNew = [];

    let secuenciaAnimaciones = [];

    while(resultadoNew.length != 1) {

        resultadoNew = [];

        for (let i = 0; i < divisiones.length; i++) {

            if(i == divisiones.length - 1 && (i + 1) % 2 != 0){

                resultadoNew.push(divisiones[i]) //si es impar

            }else{

                resultadoNew.push(unite(divisiones[i], divisiones[i + 1], cuenta(divisiones, i), posiciones, cadena, secuenciaAnimaciones, cadenaAnimaciones)); //par
                i++;

            }

        }

        divisiones = resultadoNew;

    }

    let cadenaColores = almacenarColores(cadena)

    anima(secuenciaAnimaciones, 0, cadenaColores, velocidad, 0);

}

function dividir(fragmento, divisiones){

    if(fragmento.length != 1){

        dividir(fragmento.slice(0, Math.round(fragmento.length / 2)), divisiones);

        dividir(fragmento.slice(Math.round(fragmento.length / 2), fragmento.length), divisiones);

    }else{

        divisiones.push(fragmento);

    }

}

function unite(fragmento1, fragmento2, indx, posiciones, cadena, secuenciaAnimaciones, cadenaAnimaciones) { //ordena 2 fragmentos

    let resultado = [];

    while(resultado.length != (fragmento1.length + fragmento2.length)){

        let min = Infinity;

        for(let i = 0; i < fragmento1.length; i++){

            if(fragmento1[i] < min && !resultado.includes(fragmento1[i])) min = fragmento1[i];

        }

        for(let i = 0; i < fragmento2.length; i++){

            if(fragmento2[i] < min && !resultado.includes(fragmento2[i])) min = fragmento2[i];

        }

        resultado.push(min);

    }

    preparaAnimacion(resultado, indx, posiciones, cadena, secuenciaAnimaciones, cadenaAnimaciones)

    return resultado;

}

function preparaAnimacion(resultado, indx, posiciones, cadena, secuenciaAnimaciones, cadenaAnimaciones){

    let indxRes = 0;

    for(let i = 0; i < resultado.length; i++){

        let id1 = "#f" + resultado[indxRes];

        let pos1 = buscarPorId(cadenaAnimaciones, id1)

        let id2 = buscarPorPosicion(cadenaAnimaciones, posiciones[indx])

        let pos2 = buscarPorId(cadenaAnimaciones, id2, "h")

        if (pos2 != undefined && id1 != undefined && pos1 != pos2) secuenciaAnimaciones.push([id1, "background-color", "#36682E"])

        if (pos1 != undefined && id2 != undefined && pos1 != pos2) secuenciaAnimaciones.push([id2, "background-color", "#36682E"])

        if (pos2 != undefined && id1 != undefined && pos1 != pos2) secuenciaAnimaciones.push([id1, "left", pos2])

        if (pos1 != undefined && id2 != undefined && pos1 != pos2) secuenciaAnimaciones.push([id2, "left", pos1])

        cambiarCadenaAnimaciones(cadenaAnimaciones, id1, pos2)

        cambiarCadenaAnimaciones(cadenaAnimaciones, id2, pos1)

        indxRes++;

        indx++;
    }

}

function anima(secuenciaAnimaciones, indx, cadenaColores, velocidad, numeroAnimaciones) {

    numeroAnimaciones++;

    if(indx < secuenciaAnimaciones.length) {

        if (secuenciaAnimaciones[indx][1] === "left"){

            $(secuenciaAnimaciones[indx][0]).animate({
                "left": pxToVw(secuenciaAnimaciones[indx][2])
            }, velocidad)

            $(secuenciaAnimaciones[indx + 1][0]).animate({
                "left": pxToVw(secuenciaAnimaciones[indx + 1][2])
            }, velocidad, function () {

                anima(secuenciaAnimaciones, indx + 2, cadenaColores, velocidad, numeroAnimaciones);
            })

        }else{

            let color1 = consultarColor(secuenciaAnimaciones[indx][0], cadenaColores);
            let color2 = consultarColor(secuenciaAnimaciones[indx + 1][0], cadenaColores);

            $(secuenciaAnimaciones[indx][0]).animate({
                "background-color": secuenciaAnimaciones[indx][2]
            }, velocidad)

            $(secuenciaAnimaciones[indx + 1][0]).animate({
                "background-color": secuenciaAnimaciones[indx + 1][2]
            }, velocidad, function () {

                $(secuenciaAnimaciones[indx][0]).animate({
                    "background-color": color1
                }, velocidad)

                $(secuenciaAnimaciones[indx + 1][0]).animate({
                    "background-color": color2
                }, velocidad, function () {

                    anima(secuenciaAnimaciones, indx + 2, cadenaColores, velocidad, numeroAnimaciones);
                })
            })

        }

    }else setTimeout(
        function()
        {
            $("#status").html("Ready")
        }, parseInt(numeroAnimaciones) * parseInt(velocidad));
}

function preparaCadenaAnimaciones(cadena){

    let cadenaAnimaciones = []

    for(let i = 0; i < cadena.length; i++){

        cadenaAnimaciones.push(["#f" + cadena[i], $("#f" + cadena[i]).css("left")]);

    }

    return cadenaAnimaciones;
}

function buscarPorPosicion(cadenaAnimaciones, posicion){

    for(let i = 0; i < cadenaAnimaciones.length; i++){

        if(cadenaAnimaciones[i][1] === posicion) return cadenaAnimaciones[i][0]

    }
}

function buscarPorId(cadenaAnimaciones, id, h){

    for(let i = 0; i < cadenaAnimaciones.length; i++){

        if(cadenaAnimaciones[i][0] === id) return cadenaAnimaciones[i][1]

    }

}

function cambiarCadenaAnimaciones(cadenaAnimaciones, id, posicion) {

    for(let i = 0; i < cadenaAnimaciones.length; i++){

        if(cadenaAnimaciones[i][0] === id) cadenaAnimaciones[i][1] = posicion;

    }

}

function cuenta(divisiones, i){

    let acum = 0;

    for(let j = 0; j < i; j++) acum += divisiones[i].length;

    return acum;

}


