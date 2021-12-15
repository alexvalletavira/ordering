export function colocar(cadena){

    var html = "";

    var max = dameMax(cadena);

    for(var i = 0; i < cadena.length; i++){

        var height = (((cadena[i] / max)*75) + 1); //height porcentual sobre el maximo número, mínimo 1

        height = height.toFixed(2);

        var width = (100/(cadena.length))/2; //width porcentual sobre la length de la cadena.

        width = width.toFixed(2);

        html += "<div id=f" + cadena[i] +" style='position: absolute; left: " + (width * i) * 2 +"vw; height: " + height + "vh; width: " + (width * 1.5) + "vw; top:" + (77 - height) + "vh;  background-color: " + determinaColor(i, cadena) + "'> </div>"
    }

    $("#main").html(html);

    return cadena;

}

export function generarCadenaRandom(){ //funcion que genera una cadena aleatoria.

    let cadena = [];

    let longitud = numeroAleatorio(15, 50);

    for(var i = 0; i < longitud; i++){

        var numAleatorio = numeroAleatorio(0, 255);

        while(cadena.includes(numAleatorio)){ //no queremos que dos numeros sean iguales.

            numAleatorio = numeroAleatorio(0, 255);

        }

        cadena.push(numAleatorio);

    }

    return cadena;


}

export function numeroAleatorio(min, max) { //funcion que genera un numero aleatorio entre min y max y lo redondea para que sea no decimal.

    return Math.round(min + (Math.random() * Math.abs(max - min)));

}

function dameMax(cadena) { //funcion que retorna el maximo de una cadena.

    var max = 0;

    for(var i = 0; i < cadena.length; i++){

        if(max < cadena[i]) max = cadena[i];

    }

    return max;

}

function determinaColor(j, cadena){

    var rojoBase = 232;
    var verdeBase = 204;
    var azulBase = 65;

    var rojoCompleto = 199;
    var verdeCompleto = 72;
    var azulCompleto = 34;

    var ranking = dameRanking(j, cadena);

    var rojo = ((rojoBase) * (ranking/cadena.length)) + ((rojoCompleto) * ((cadena.length - ranking)/cadena.length))

    var verde = ((verdeBase) * (ranking/cadena.length)) + ((verdeCompleto) * ((cadena.length - ranking)/cadena.length))

    var azul = ((azulBase) * (ranking/cadena.length)) + ((azulCompleto) * ((cadena.length - ranking)/cadena.length))

    return "rgb(" + rojo + ", " + verde + ", " + azul + ")";

}

function dameRanking(j, cadena){

    let peques = 0;

    for(let i = 0; i < cadena.length; i++){

        if(cadena[i] < cadena[j]){

            peques++;

        }

    }

    return peques;

}

export function copiarContenido(cadena, cadenaDeCadenas){

    for(let i = 0; i < cadena.length; i++){

        cadenaDeCadenas[cadenaDeCadenas.length-1][i] = cadena[i];

    }

}

export function damePosiciones(cadena){

    let posiciones = [];

    for(let i = 0; i < cadena.length; i++){

        posiciones.push($("#f"+cadena[i]).css("left"));

    }

    return posiciones;

}

export function pxToVw(str){

    return (100 * parseInt(truncate(str, 2)) / window.innerWidth).toString() + "vw";

}
function truncate(str, n){

    return str.substring(0, str.length - n);
};

export function almacenarColores(cadena){

    let cadenaColores = [];

    for(let i = 0; i < cadena.length; i++){

        cadenaColores.push([cadena[i], $("#f" + cadena[i]).css("background-color")])

    }

    return cadenaColores;

}

export function consultarColor(id, cadenaColores){

    for(let i = 0; i < cadenaColores.length; i++){

        if("#f" + cadenaColores[i][0] == id){

            return cadenaColores[i][1];

        }

    }

}

export function dameIdDesdePosicion(cadena, posicion){

    for(let i = 0; i < cadena.length; i++){

        if ($("#f"+cadena[i]).css("left") === posicion) return ("#f" + cadena[i]);

    }

}
