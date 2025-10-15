function getComment() {

    fetch("get_comment.php")
        .then(r => r.json())
        .then(data => {

            for (i = 0; i < data.length; i++) {
                const notation = data[i].notation;
                let stars = "";


                if (notation !== 0) {
                    for (j = 0; j < notation; j++) {
                        stars += "★"
                    }
                }else{stars = "0★"}

                


                const html = `
                <div style="border-top:1px solid var(--color-gold); padding-bottom:8px;margin-top:8px;padding-top:8px">
          
                Le ${data[i].date} ${data[i].prenom} a écrit : <br>
                ${stars}
                <br>
                "${data[i].commentaire}"
                </div>`

                $('#input_comment').append(html);
            }

        })
}


getComment()