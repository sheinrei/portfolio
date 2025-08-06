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


    //effet avec le scale on hover
    $('.frame_projet_detail').on("mouseenter", function () {

        let scale = 1
        const handler = setInterval(() => {

            if (scale < 1.1) {
                scale += 0.005
                $(this).css("scale", scale);

            } else {
                scale = 1
            }
        }, 42)

        $('.frame_projet_detail').on("mouseleave", function () {
            clearInterval(handler);
            $(this).css("scale", "1");

        })
    })


    async function getProjectData() {
        const reponse = await fetch("dataProjet.json");
        const data = await reponse.json();
        return data;
    }


    $('.frame_projet_detail').on("click", async function () {

        const data = await getProjectData();

        let opacity = 1;

        let handler = setInterval(() => {
            opacity -= 0.1;
            $(".content").css("opacity", opacity);
            $(".header").css("opacity", opacity);
            $(".footer").css("opacity", opacity);

            if (opacity < -0.2) {
                clearInterval(handler);
                $(".content").addClass("display-none");
                $(".header").addClass("display-none");
                $(".footer").addClass("display-none");


                const id = $(this).attr("id");
                let texte;
                if (id === "projet-1") {
                    texte = data.stationMeteo;
                } else if (id === "projet-2") {
                    texte = data.discoShein
                } else if (id === "projet-3") {
                    texte = data.swm;
                }

                const div = `<div class="frame-detail-projet">
                <a class="title-projet" href="${texte.url}">${texte.titre}</a>
                <p>Technologie utillisé : ${texte.technologie}</p>
                <p class="presentation-projet">Présentation : ${texte.presentation}</p>
                <img class="image-projet" src="${texte.background}" alt="-- En cours de construction --">
                </div>`

                $(div).insertAfter(".header")

            }

        }, 42);



    })


    //click pour sortir de la frame detail projet
    $("body").on("click", ".frame-detail-projet", function () {


        let opacity = 1;
        let opacity_reverse = 0;

        const handler = setInterval(() => {

            $(".header").removeClass("display-none");
            $(".footer").removeClass("display-none");
            $(".content").removeClass("display-none");
            
            
            $(this).css("opacity", opacity)
            $(".header").css("opacity", opacity_reverse);
            $(".footer").css("opacity", opacity_reverse);
            opacity -= 0.1;
            opacity_reverse += 0.1;
            
            if (opacity < 0) {
                clearInterval(handler);
                $(".content").css("opacity", "1");
                $(".frame-detail-projet").remove("div");
            }
        }, 42)

    })




})