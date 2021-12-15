import {colocar, generarCadenaRandom} from './modules/utiles.mjs';
import {switching} from './modules/switching.mjs';
import {selection} from "./modules/sorting.mjs";
import {bubble} from "./modules/bubble.mjs";
import {quick} from "./modules/quick.mjs";
import {merge} from "./modules/merge.mjs";

$(document).ready(function () {

    let processing = true;

    let cadena = colocar(generarCadenaRandom());

    let type = "switching"

    let speed = 50;

    let wait = 0;

    $("#speed").slider({
        value: 50,
    });

    $("#start").click(function () {

        if($("#status").text().includes("Ready") && !processing) {

            $("#status").html("Processing...")

            speed = (speed * speed)/2;

            switch (type) {
                case "switching":
                    switching(cadena, speed);
                    break;
                case "bubble":
                    bubble(cadena, 0, speed)
                    break;
                case "selection":
                    selection(cadena, speed, 0)
                    break;
                case "merge":
                    merge(cadena, speed)
                    break;
                case "quick":
                    quick(cadena, speed)
                    break;
            }
        }

    })

    $("#newArray").click(function () {

        if($("#status").text().includes("Ready") && !processing) cadena = colocar(generarCadenaRandom());

    })

    $("#switching").click(function () {

        type = "switching";

    })

    $("#bubble").click(function () {

        type = "bubble";

    })

    $("#selection").click(function () {

        type = "selection";

    })

    $("#quick").click(function () {

        type = "quick";

    })

    $("#merge").click(function () {

        type = "merge";

    })

    $('#speed').change(function(event) {
        speed = document.querySelector('#speed').value;
    });

    $(".itemDrop").on('click', function () {

        $(".dropdown-content").css("display", "none");

        setTimeout(
            function () {

                $(".dropdown-content").css("display", "");

            }, 0);

    });

    $("#buttonTutorial").on('click', function () {
        processing = false;
        $("#tutorial").css("display", "none");
    });


});


