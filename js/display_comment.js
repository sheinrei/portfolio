function getComment() {
    fetch("get_comment.php")
        .then(r => r.json())
        .then(data => {
            for (let i = 0; i < 2; i++) {
                if(!data[i])return 

                const notation = data[i].notation;
                let stars = "";


                if (notation !== 0) {
                    for (j = 0; j < notation; j++) {
                        stars += "★"
                    }
                } else { stars = "0★" }



                const html = `
                <div class="cards-comment">
          
                <span class="comment-date">Le ${data[i].date} ${data[i].prenom} a écrit : </span>
                <span class="comment-stars">${stars}</span>
                <span class="comment-text">"${data[i].commentaire}"</span>
                </div>`

                $('#input_comment').append(html);
            }

        })

}

let i = 0
getComment(i)
