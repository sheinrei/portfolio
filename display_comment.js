function getComment() {

    fetch("get_comment.php")
        .then(r => r.json())
        .then(data => {

            for (i = 0; i < data.length; i++) {
                const html = `
                <div>
                Le ${data[i].date} ${data[i].prenom} a écrit : <br>

                "${data[i].commentaire}"
                </div>
                <br>
        `
                $('#input_comment').append(html);
            }

        })
}


getComment()