$(function (){

    $(".modale_project").on("click", function(){
    $modale = $(this);
    $modale.hasClass("big_modale_project") ? $modale.removeClass("big_modale_project") : $modale.addClass("big_modale_project");
    $modale.css()

    })

})