function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function controlInputComment(nom, prenom, email, commentaire) {
    if (nom.length < 1) {
        createClassiqueModale("Merci de renseignez notre nom", "Attention")
        return false
    }

    if (prenom.length < 1) {
        createClassiqueModale("Merci de renseignez notre prénom")
        return false
    }

    const valideEmail = validateEmail(email)
    if (!valideEmail) {
        createClassiqueModale("Email invalide ! Merci de corriger votre saisie")
        return false
    }

    if (commentaire.length < 1) {
        createClassiqueModale("Vous essayez de déposer un commentaire mais avec un commentaire c'est encore mieux !")
        return false
    }

    return true
}

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
        console.log(commentaire.length)


        const control = controlInputComment(nom, prenom, email, commentaire)

        if (control) {
            fetch("traitement_comment.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `nom=${encodeURIComponent(nom)}&prenom=${encodeURIComponent(prenom)}&email=${encodeURIComponent(email)}&commentaire=${encodeURIComponent(commentaire)}&stars=${encodeURIComponent(stars_value)}`
            })
                .then(r => r.ok ? console.log("Commentaire envoyé") : alert("Erreur serveur"))
                .then(() => {
                    createClassiqueModale(`<div>
                        <p style="margin-bottom:8px">Merci d'avoir déposé votre commentaire. </p>
                        <p>
                            Pour garantir un espace respectueux et agréable à tous, les commentaires inappropriés, 
                            injurieux ou irrespectueux ne seront pas affichés.
                        </p>
                        </div>`)

                    $("#nom").val("");
                    $("#prenom").val("");
                    $("#email").val("");
                    $("#commentaire").val("");
                })
        }

    })





    //effet avec le scale on hover
    $('.frame_projet_content').on("mouseenter", function () {

        let scale = 1
        const handler = setInterval(() => {

            if (scale < 1.1) {
                scale += 0.005
                $(this).css("scale", scale);

            } else {
                scale = 1
            }
        }, 42)

        $('.frame_projet_content').on("mouseleave", function () {
            clearInterval(handler);
            $(this).css("scale", "1");

        })
    })


    async function getProjectData() {
        const reponse = await fetch("dataProjet.json");
        const data = await reponse.json();
        return data;
    }



    //click pour ouvrir une frame projet
    $('.frame_projet_content').on("click", async function () {

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

                const texte = data[`${id}`];


                const div = `<div class="frame-detail-projet">
                <a class="title-projet" href="${texte.url}">${texte.titre}</a>
                <p>Technologie utillisé : ${texte.technologie}</p>
                <p class="presentation-projet"><strong>Présentation :</strong><br> ${texte.presentation}</p>
                <p>Image représentative pour découvrir le site <a href="${texte.url}" target="_blank"> cliquez ici <a/>
                <img loading="lazy" class="image-projet" src="${texte.background}" alt="-- En cours de construction --">
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