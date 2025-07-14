$(function () {

    $("input[type=submit]").on("click", function (e) {
        e.preventDefault();

        const modale = `
            <div class="modale">
                <div class="top-modale">
                    <div class="top_modale_left">Message</div>
                    <div class="close_modale"> X </div>
                </div>
                <div class="content_modale">
                    <p>Merci d'avoir déposé votre commentaire. <br>
                        Le message sera affiché dés la validation du commentaire (censure).
                    </p>
                </div>
            </div>
        `;

        $("form").append(modale);
    })


    $(document).on("click", ".close_modale", function () {
        $(".modale").remove()
    })


    //bouger la boite modale
    const position = {
        last_x: 0,
        last_y: 0,
        new_x: 0,
        new_y: 0,
    }
    let activ_move = false;
    let target = null;


    $("body").on("mousedown", ".modale", function (e) {
        const element = e.target;
            activ_move = true;
            target = element;
            position.last_x = e.pageX;
            position.last_y = e.pageY;        
    })


    // part 2 mouse move
    $("body").on("mousemove", function (e) {
        if (activ_move && target) {
            target = $(".modale");
            const decal_x = e.pageX - position.last_x;
            const decal_y = e.pageY - position.last_y;

            // mise à jour position modale
            const currentLeft = parseInt($(target).css("left")) || 0;
            const currentTop = parseInt($(target).css("top")) || 0;


            $(target).css({
                "left": currentLeft + decal_x,
                "top": currentTop + decal_y
            });

            position.last_x = e.pageX;
            position.last_y = e.pageY;
        }
    })

    $("body").on("mouseup", function () {
        activ_move = false;
        target = null;
    });
})