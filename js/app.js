/*
 * Create a list that holds all of your cards
 */
let cards = ['fa fa-diamond','fa fa-diamond',
             'fa fa-paper-plane-o','fa fa-paper-plane-o',
             'fa fa-anchor','fa fa-anchor',
             'fa fa-bolt','fa fa-bolt',
             'fa fa-cube','fa fa-cube',
             'fa fa-leaf','fa fa-leaf',
             'fa fa-bicycle','fa fa-bicycle',
             'fa fa-bomb','fa fa-bomb',
            ];

//Create the cards
function generateCards(card){
    return `<li class="card" data-card="${card}"><i class="${card}"></i></li>`;

}

/*
global variables
*/

let second = 0;
let minute = 0; 
let hour = 0;
let interval;
let moves = 0;
let allCards;
let openCards=[];
let pairs = 0;
let starList = document.querySelectorAll('.stars li');
let stars = document.querySelectorAll(".fa fa-star");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


    //Display card on deck
    let deck = document.querySelector('.deck');

    function startmemoryGame(){ 

    //shuffle deck
    let cardHTML = shuffle(cards).map(function(card){
        resetMoves();
        return generateCards(card);
            
    });

    deck.innerHTML = cardHTML.join('');
    allCards = document.querySelectorAll('.card');
    allCards.forEach(moveHandler);

        //reset moves
        resetMoves();

        //reset stars
        for(stars of starList){
           {
                stars.style.color = "#FFD700";
                stars.style.display = 'visible';
            }
            
        }

    //reset timer
    let clock = document.querySelector('.clock');
    clock.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

    console.log('startMemoryGame was called');

}
//Start game onload
document.onload = startmemoryGame();
/*
- display the card's symbol
 * add the card to a *list* of "open" cards
 * if the list already has another card, check to see if the two cards match
 * if the cards do match, lock the cards in the open position
 * if the cards do not match, remove the cards from the list and hide the card's symbol*/




 

function checkIfCardIsValid() {
    if (!card.classList.contains('open') || !card.classList.contains('show') && (openCards.length < 2)) {
        return true;
    } else {
        return false;
    }
}

//Reference: FEND P3: Memory Game with Mike Wales
function moveHandler(card) {

    // Here you are adding an event listener to each card
    card.addEventListener('click', function (e) {


        if(!card.classList.contains('open') || !card.classList.contains('show')){
            console.log('add an open card');


         if (openCards.length < 1) {
            openCards.push(card);
            card.classList.add('open', 'show');
            return;
        }
                          openCards.push(card);
          
            if (openCards.length === 2) {
            //onwinningtheGame();
            console.log('open card legnth: ', openCards.length);
            card.classList.add('open', 'show');
                addMove();
                checkScore();

                //If they Match
                if (openCards[0].dataset.card == openCards[1].dataset.card) {

                    console.log('This is a Match');
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');
                    //empty openCards array
                   
                    openCards = [];
                   // user has made another match
                    pairs++

                    // check to see if player has won the game
                    onwinningtheGame();
                }
                // if no match, hide
                else{
                setTimeout(function () {
                    openCards.forEach(function (card) {
                        card.classList.remove('open', 'show');
                    });
                    openCards = [];
                }, 500);
            }
            }
        }
    }); 
}                    

// For each card, we call the moveHandler function
allCards.forEach(moveHandler);

//Reference: mathewcranford.com guides for resetMoves & stars
function addMove(){
 moves++;
 let movesText = document.querySelector('.moves');
    
    movesText.innerHTML = moves;
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}


function resetMoves(){
  let  moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function checkScore(){
    if(moves === 16 || moves===24){
        removeStar();
    }
}   

function removeStar(){

    for(stars of starList){
        if(stars.style.display !== 'none'){
            stars.style.display = 'none';
            break;
        }
        
    }
}

//For playagain()
function reload(){
    modal.classList.remove("show");
    location.reload();
}

//Game Timer Reference: https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript#toc-3-moves


let clock = document.querySelector('.clock');
//let interval;
function startTimer(){
    interval = setInterval(function(){
        clock.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

//modal reference: https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript for modal
let modal = document.getElementById("popup1")
//stars list
 let starsList = document.querySelectorAll(".stars li");
//close icon - modal
 let closeicon = document.querySelector(".close");

//close icon - modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startmemoryGame();
    });
}
//Play Again 
function playAgain(){
    startmemoryGame();
    modal.classList.remove("show");
}
//when all cards match, show modal and moves, time and rating
function onwinningtheGame(){
    console.log('onwinningtheGame function was called!');

        if (pairs==8){          
            clearInterval(interval);
            finalTime = clock.innerHTML;
            //show congratulations modal
            modal.classList.add("show");
            //declare star rating variable
            let starRating = document.querySelector(".stars").innerHTML;
            //showing move, rating, time on modal
            document.getElementById("finalMove").innerHTML = moves;
            document.getElementById("starRating").innerHTML = starRating;
            document.getElementById("totalTime").innerHTML = finalTime;
            //closeicon on modal
            closeModal();
        }
}