function getbackground(element){
    const background = {
        "station-meteov1" : "background-image: url(img/meteo1.png);",
        "statio-meteov2" : "...",
        "discoShein" : "...",
        "bestFlix" : "...",

    }
    
    const result = background.element;
    return result
}

$(function (){



    $(".modale_project").on("click", function(){
    $modale = $(this);
    $modale.hasClass("big_modale_project") ? $modale.removeClass("big_modale_project") : $modale.addClass("big_modale_project");
    $modale.css()

    })

})