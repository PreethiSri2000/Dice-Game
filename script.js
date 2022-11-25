'use strict';
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0"); //getElementById is same a querySelector
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnInst = document.querySelector(".btn--inst");
const btnCloseInst = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay=document.querySelector(".overlay");
const btnGoal=document.querySelector(".btn--goal");

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;
let goal=0;
let setGoal=false;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active"); //toggle method will add this class if element doesn't have it or remove it if it does.
    player1El.classList.toggle("player--active");
}

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

//function to close the modal when user click the button/overlay
const closeModal = function () {

    modal.classList.add('hidden');
    overlay.classList.add('hidden');

}

btnRoll.addEventListener("click", function () {
    if (playing && setGoal) {
        //1.Generate random dice
        
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.display the dice
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove('hidden');

        //3.check the dice value is 1 or not
        if (dice !== 1) {
            //add the dice value to current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;


        } else {
            //If 1 occurs in dice
            switchPlayer();

        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing && setGoal) {
        //1. Add current score to score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        //2.If score>=100 active player wins
        if (scores[activePlayer] >= goal) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            //3.Make current score to zero, Switch the player
            switchPlayer();
        }
    }

})

btnNew.addEventListener("click", function () {
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    diceEl.classList.add('hidden');
    playing = true;
    currentScore = 0;
    scores[0] = 0, scores[1] = 0;
    activePlayer = 0;
    goal=0;
    btnGoal.textContent=`🎯Target Score`;
    setGoal=false;
});

btnInst.addEventListener("click", openModal);

btnCloseInst.addEventListener("click",closeModal);

overlay.addEventListener("click", closeModal);

btnGoal.addEventListener("click", function(){
    if(!setGoal){
        
        goal=prompt("Set Your Target Score");
        console.log(goal);

        while(setGoal===false){
            console.log(goal);
            if(goal===undefined || goal===null || goal===""){
                alert("Please set your target score!!😊");
                goal=prompt("Set Your Target Score");
            }
            else{
                setGoal=true;
                btnGoal.textContent=`🎯Target-${goal}`;
            }
        }
        
    }
    
});


