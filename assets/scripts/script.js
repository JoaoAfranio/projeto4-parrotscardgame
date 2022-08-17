let firstFlipedCard = null;
let secondFlipedCard = null;

let qntChecks = 0;
let pairFounds = 0;
let totalPairs = 0;

let seconds = 0;
let minutes = 0;

const timerText = document.querySelector("#time");

setInterval(function () {
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (seconds < 10) {
    timerText.innerHTML = `${minutes}:0${seconds}`;
  } else {
    timerText.innerHTML = `${minutes}:${seconds}`;
  }

  seconds++;
}, 1000);

const cards = [
  ["bobrossparrot", "bobrossparrot.gif"],
  ["explodyparrot", "explodyparrot.gif"],
  ["fiestaparrot", "fiestaparrot.gif"],
  ["metalparrot", "metalparrot.gif"],
  ["revertitparrot", "revertitparrot.gif"],
  ["tripletsparrot", "tripletsparrot.gif"],
  ["unicornparrot", "unicornparrot.gif"],
];

function startGame() {
  let qntCards = prompt(
    "Digite a quantidade de cartas que deseje jogar (4-14)"
  );
  while (qntCards < 4 || qntCards > 14) {
    qntCards = prompt("Digite a quantidade de cartas que deseje jogar (4-14)");
  }

  totalPairs = qntCards / 2;

  const game = document.querySelector(".game");

  let maxIndice = cards.length - 1;

  let selectCard;
  const allCardsToPlay = cards;
  const selectedCardsToPlay = [];

  for (let i = 0; i < totalPairs; i++) {
    let indice = randomNumberMax(maxIndice);

    selectCard = allCardsToPlay[indice];
    allCardsToPlay.splice(indice, 1);

    maxIndice -= 1;

    selectedCardsToPlay.push(selectCard);
    selectedCardsToPlay.push(selectCard);
  }

  selectedCardsToPlay.sort(comparador);

  for (let i = 0; i < selectedCardsToPlay.length; i++) {
    game.innerHTML += `
      <div class="card" onClick="verificaCarta(this)">
      <img class="front" src="./src/front.png" />
      <img class="back" id="${selectedCardsToPlay[i][0]}" src="./src/${selectedCardsToPlay[i][1]}" />
      </div>
    `;
  }
}

function comparador() {
  return Math.random() - 0.5;
}

function randomNumberMax(max) {
  return Math.floor(Math.random() * max);
}

function verificaCarta(card) {
  if (firstFlipedCard !== null && secondFlipedCard !== null) return;

  qntChecks++;

  let idFirstCard;
  let idSecondCard;

  card.classList.add("flip");

  if (firstFlipedCard === null) {
    firstFlipedCard = card;
  } else {
    secondFlipedCard = card;

    idFirstCard = firstFlipedCard.querySelector("img.back").getAttribute("id");
    idSecondCard = secondFlipedCard
      .querySelector("img.back")
      .getAttribute("id");

    setTimeout(function () {
      if (idFirstCard !== idSecondCard) {
        firstFlipedCard.classList.remove("flip");
        secondFlipedCard.classList.remove("flip");
      } else {
        pairFounds++;
        console.log(pairFounds);
        if (totalPairs === pairFounds) {
          alert(
            `Você venceu com o tempo de ${timerText.innerHTML} e ${qntChecks} jogadas`
          );
          // const newGame = prompt("Deseja jogar um novo jogo?");
          // if (newGame === "sim") {
          //   startGame();
          // }
        }
      }

      firstFlipedCard = null;
      secondFlipedCard = null;
    }, 950);
  }
}

startGame();
