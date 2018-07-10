const dataUrl = "https://api.myjson.com/bins/152f9j";
let cards = [];
let numberOfCards = 0;
const cardsHtml = document.getElementById("cards");
const tagsHtml = document.getElementById("tags");
const getBackButton = document.getElementById("getBackButton");
const inputSearch = document.getElementById('inputSearch');
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
            "<div class='card' id="+i+">" +
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
    if (pageHeight <= windowHeight+scrollPosition && numberOfCards < 50) {
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

function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    cardsHtml.innerHTML = "";
    showCards();
}

getBackButton.addEventListener('click', scrollTop);

function search() {
    let filter;
    filter = inputSearch.value.toUpperCase();
    // Loop through all list items, and hide those who don't match the search query

    for (i = 0; i < numberOfCards+10; i++) {
       // console.log(cards[i]);
        title = cards[i].title;
        c = document.getElementById(i);
        if (title.toUpperCase().indexOf(filter) > -1) {
            c.style.display = "";
        } else {
            c.style.display = "none";
        }
    }
}

inputSearch.addEventListener("input", search);
console.log(inputSearch.value);