let firstFlipedCard = null;
let secondFlipedCard = null;

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
  const qntCards = prompt("Digite a quantidade de cartas que deseje jogar:");

  const game = document.querySelector(".game");

  let maxIndice = cards.length - 1;

  let selectCard;
  let allCardsToPlay = cards;
  let selectedCardsToPlay = [];

  for (let i = 0; i < qntCards / 2; i++) {
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
      }

      firstFlipedCard = null;
      secondFlipedCard = null;
    }, 950);
  }
}

startGame();
