const dataUrl = "https://api.myjson.com/bins/152f9j";
let cards = [];
let numberOfCards = 0;
let filteredCards = [];
const cardsHtml = document.getElementById("cards");
const tagsHtml = document.getElementById("tags");
const getBackButton = document.getElementById("getBackButton");
const ascendingButton = document.getElementById("ascending");
const descendingButton = document.getElementById("descending");
const deleteCardButtons = document.getElementsByClassName("deleteButton");
const tagsButtons = document.getElementsByClassName("tag");
const inputSearch = document.getElementById('inputSearch');
const sortingTags = [];
const sortBy = 'sortBy';
window.onload = () => {
    fetch(dataUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            cards = data.data;
            filteredCards = cards;
            showCards(filteredCards);
            numberOfCards+=10;
            showTags();
            let sortingFromLocal = localStorage.getItem(sorting);
            if(sortingFromLocal===null){
                sortDescending(filteredCards);
            }
            else{
                if(sortingFromLocal === "ascending"){
                    sortAscending(filteredCards);
                }
                else {
                    sortDescending(filteredCards);
                }
            }
        })
        .catch(err =>{
            console.log(err);
        });
};


function showCards(cardsToShow){

    for(let i = numberOfCards; i < numberOfCards+10 && i < cardsToShow.length; ++i){
        let card =
            "<div class='card' id="+i+">" +
                "<div class='container'>" +
                    "<button class=\"deleteButton\" onclick='deleteCard(event)'><i class=\"fa fa-close\"></i></button>"+
                    "<img src="+cardsToShow[i].image +" alt=\"Avatar\">"+
                    "<div class='title'>"+cardsToShow[i].title+"</div>" +
                    "<div class='desc'>"+cardsToShow[i].description+"</div>" +
                    "<div class='date'>"+cardsToShow[i].createdAt+"</div>" +
                    "<div class='tags'>"+cardsToShow[i].tags+
            "</div></div></div>";
        cardsHtml.innerHTML += card;
    }
}



window.onscroll = function () {
    var pageHeight=document.documentElement.offsetHeight,
        windowHeight=window.innerHeight,
        scrollPosition=window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
    if (pageHeight <= windowHeight+scrollPosition && numberOfCards < 50) {
        showCards(cards);
        numberOfCards+=10;
        console.log(numberOfCards);
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
        let tag = "<div class='tag filterButton' onclick='sortByTags(event)'>"+t+"</div>";
        tagsHtml.innerHTML += tag;
    }
}

function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    cardsHtml.innerHTML = "";
    numberOfCards = 0;
    showCards(filteredCards);
}

getBackButton.addEventListener('click', scrollTop);

function search() {
    cardsHtml.innerHTML = "";
    let filter = inputSearch.value.toUpperCase();
    let searchCards = cards.slice();
    for (i = 0; i < cards.length; i++) {
        title = cards[i].title;
        if (title.toUpperCase().indexOf(filter) > -1) {

        } else {
            searchCards.splice(searchCards.indexOf(cards[i]),1);
        }

    }
    filteredCards = searchCards;
    numberOfCards = 0;
    showCards(filteredCards);

}

for (let i = 0; i < deleteCardButtons.length; i++) {
    deleteCardButtons[i].addEventListener('click', deleteCard);
}

for (let i = 0; i < tagsButtons.length; i++) {
    tagsButtons[i].addEventListener('click', sortByTags);
}

function deleteCard() {
    cardsHtml.innerHTML = "";
    let card = event.target.parentNode.parentNode;
    let filter = card.getElementsByClassName("date")[0].innerHTML;
    let cardsLeft = filteredCards.slice();
    for (i = 0; i < filteredCards.length; i++) {
        date = filteredCards[i].createdAt;
        if (date.indexOf(filter) > -1) {
            cardsLeft.splice(cardsLeft.indexOf(filteredCards[i]),1);
        } 

    }
    filteredCards = cardsLeft;
    numberOfCards = 0;
    showCards(filteredCards);
}
inputSearch.addEventListener("input", search);

function sortAscending(filteredCards) {
    cardsHtml.innerHTML = "";
    filteredCards = filteredCards.sort((card1, card2) => {
        const date1 = new Date(card1.createdAt), date2 = new Date(card2.createdAt);
        return date2 < date1 ? 1 : -1;
    });
    showCards(filteredCards);
    localStorage.setItem(sortBy, 'ascending');
}

function sortDescending(filteredCards) {
    cardsHtml.innerHTML = "";
    console.log(filteredCards.length);
    filteredCards = filteredCards.sort((card1, card2) => {
        const date1 = new Date(card1.createdAt),
            date2 = new Date(card2.createdAt);
        return date2 < date1 ? -1 : 1;
    });
    showCards(filteredCards);
    localStorage.setItem(sortBy, 'descending');
}

ascendingButton.addEventListener('click', () => sortAscending(filteredCards));
descendingButton.addEventListener('click', () => sortDescending(filteredCards));

function sortByTags() {
    let tagHtml = event.target;
    tagHtml.classList.contains('active')? tagHtml.classList.remove('active'):tagHtml.classList.add('active');
   // let tag = {"tag":tagHtml.innerHTML};
    sortingTags.push(tagHtml.innerHTML);
    cardsHtml.innerHTML = "";
    let sortedByTags = filteredCards.slice();

    for (i = 0; i < filteredCards.length; i++) {
        tags = filteredCards[i].tags;
        console.log(tags);
        console.log(sortingTags);
        console.log(tags.indexOf(sortingTags))
        if (tags.indexOf(sortingTags) > -1) {

        } else {
            sortedByTags.splice(sortedByTags.indexOf(filteredCards[i]),1);
        }

    }
    filteredCards = sortedByTags;
    showCards(filteredCards);
}