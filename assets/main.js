const dataUrl = "https://api.myjson.com/bins/152f9j";
let cards = [];
let numberOfCards = 0;
const cardsHtml = document.getElementById("cards");
const tagsHtml = document.getElementById("tags");
window.onload = () => {
    fetch(dataUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            cards = data.data;
            showCards();
            showTags();
        })
        .catch(err =>{
            console.log(err);
        });
};

function showCards(){

    for(let i = numberOfCards; i < numberOfCards+10; i++){
        let cardTags = "";
        for(let j = 0; j < cards[i].tags.length; j++){
            cardTags+="<div class='tag'>"+cards[i].tags[j]+"</div>"
        }
        let card =
            "<div class='card'>" +
                "<div class='container'>" +
                    "<button class=\"deleteButton\"><i class=\"fa fa-close\"></i></button>"+
                    "<img src="+cards[i].image +" alt=\"Avatar\">"+
                    "<div class='title'>"+cards[i].title+"</div>" +
                    "<div class='desc'>"+cards[i].description+"</div>" +
                    "<div class='date'>"+cards[i].createdAt+"</div>" +
                    "<div class='tags'>"+cardTags+
            "</div></div></div>";
        cardsHtml.innerHTML += card;
    }
}
console.log(window.pageYOffset);
window.onscroll = function () {
    var pageHeight=document.documentElement.offsetHeight,
        windowHeight=window.innerHeight,
        scrollPosition=window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
    if (pageHeight <= windowHeight+scrollPosition && numberOfCards < 40) {
        numberOfCards+=10;
        showCards();
    }
};

function showTags() {
    let tags = new Set();
    for(let i = 0; i < cards.length; i++) {
        for(let j = 0; j < cards[i].tags.length; j++){
            tags.add(cards[i].tags[j]);
        }
    }
    for(let t of tags){
        let tag = "<div class='tag'>"+t+"</div>";
        tagsHtml.innerHTML += tag;
    }
}