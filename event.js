$(function () {

    let stars_value;

    //attribut la value quand on change la notation
    $("input[name=rating]").on("change", function (e) {
        const element = $(e.target).val();
        stars_value = element;
    })


    //valider le formulaire
    $("input[type=submit]").on("click", function (e) {
        e.preventDefault();



        const nom = $("#nom").val();
        const prenom = $("#prenom").val();
        const email = $("#email").val();
        const commentaire = $("#commentaire").val();



        if (nom.length > 0 && prenom.length > 0 && email.length > 0 && commentaire.length > 0 && stars_value > 0) {


            fetch("traitement_comment.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `nom=${encodeURIComponent(nom)}&prenom=${encodeURIComponent(prenom)}&email=${encodeURIComponent(email)}&commentaire=${encodeURIComponent(commentaire)}&stars=${encodeURIComponent(stars_value)}`
            })
                .then(r => r.ok ? console.log("Commentaire envoyé") : alert("Erreur serveur"))
                .then(() => {

                    const modale = `
                <div class="modale">
                
                <div class="top-modale">
                <div class="top_modale_left">Message</div>
                <div class="close_modale"> X </div>
                </div>
                
                <div class="content_modale">
                <p>Merci d'avoir déposé votre commentaire. <br>
                Pour garantir un espace respectueux et agréable à tous, les commentaires inappropriés, 
                injurieux ou irrespectueux ne seront pas affichés. Merci de rester courtois !
                </p>
                </div>
                </div>
                `;

                    $("form").append(modale);

                    $("#nom").val(" ");
                    $("#prenom").val(" ");
                    $("#email").val(" ");
                    $("#commentaire").val(" ");
                })

        }
    })


    //Déplacer la boite modale
    $(document).on("click", ".close_modale", function () {
        $(".modale").remove()
    })

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
    // fin des event pour deplkacer la modale


    //date et heure dans le header

    setInterval(() => {
        const date = new Date();
        const current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        $(".right-header p").text(current_time);
    }, 1000)
})