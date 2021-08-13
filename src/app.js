/* eslint-disable */
import "bootstrap";
import "./style.css";

//RANDOM VARIABLES LLAMARLAS
const SUITECONTENT = ["♦", "♥", "♣", "♠"];
const NUMBERCONTENT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const BLANK_SPACE = document.querySelector("#blankSpace");
const CREATE_BUTTON = document.querySelector("#createCardsButton");
const CARDS_APPEAR_HERE1 = document.querySelector("#createdCardsDiv1");

const BUBBLE_BUTTON = document.querySelector("#bubbleSortButton");
const SELECTION_BUTTON = document.querySelector("#selectSortButton");

let createdCards = [];

window.onload = function() {
  // Evento: al hacer click en botón de crear, sucede función para que funcione el botón
  CREATE_BUTTON.addEventListener("click", event => {
    createButtonWorking(event);
  });

  BUBBLE_BUTTON.addEventListener("click", event => {
    event.preventDefault();
    bubbleButtonWorking(event);
  });

  SELECTION_BUTTON.addEventListener("click", event => {
    event.preventDefault();
    selectionButtonWorking(event);
  });
};

const bubbleButtonWorking = event => {
  bubbleSort(createdCards);
  paintCard(createdCards);
};

const selectionButtonWorking = event => {
  selectSort(createdCards);
  paintCard(createdCards);
};

// Función para que el botón haga lo suyo: hace un recorrido del valor introducido en el Blank Space
const createButtonWorking = event => {
  event.preventDefault();
  // Que no se recarque la página

  // console.log(BLANK_SPACE.value); // Prueba de que funcione, imprime el valor introducido en el Blank Space
  createdCards = [];
  for (let index = 0; index < BLANK_SPACE.value; index++) {
    createdCards.push(createCardsFromTheGivenNumber());
  }
  paintCard(createdCards);
  // console.log(createdCards);
};

// Esta es la función que sucede cuando se coge el valor del recorrido en Blank Space
const createCardsFromTheGivenNumber = () => {
  let card = {
    suit: SUITECONTENT[getRandom(SUITECONTENT)],
    value: NUMBERCONTENT[getRandom(NUMBERCONTENT)]
  };
  // console.log(card); // Imprime un valor random de los keys del objeto "card": suite y value

  return card;
};

const paintCard = cards => {
  CARDS_APPEAR_HERE1.innerHTML = ""; // Contenido del DIV debajo donde aparecen las cartas

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    // El body de la carta
    let createCardsFromTheGivenNumber = document.createElement("div");
    createCardsFromTheGivenNumber.classList.add("poker-card");

    // Suit1 arriba de la carta
    let topSuitDiv = document.createElement("div");
    let topSuitContent = document.createTextNode(card.suit);
    topSuitDiv.appendChild(topSuitContent);
    topSuitDiv.classList.add("suit1-to-the-left");
    createCardsFromTheGivenNumber.appendChild(topSuitDiv);

    // Número ó letra en el centro, hay que ponerlas en el window.onload en orden de aparición
    let NumberOrLetterDiv = document.createElement("div");

    let NumberOrLetterContent = "";

    if (card.value == 1) {
      NumberOrLetterContent = document.createTextNode("A");
    } else if (card.value == 11) {
      NumberOrLetterContent = document.createTextNode("J");
    } else if (card.value == 12) {
      NumberOrLetterContent = document.createTextNode("Q");
    } else if (card.value == 13) {
      NumberOrLetterContent = document.createTextNode("K");
    } else {
      NumberOrLetterContent = document.createTextNode(card.value);
    }

    NumberOrLetterDiv.appendChild(NumberOrLetterContent);
    NumberOrLetterDiv.classList.add("card-number-center");
    createCardsFromTheGivenNumber.appendChild(NumberOrLetterDiv);

    // Suit2 abajo de la carta
    let bottomSuitDiv = document.createElement("div");
    let bottomSuitContent = document.createTextNode(card.suit);
    bottomSuitDiv.appendChild(bottomSuitContent);
    bottomSuitDiv.classList.add("suit2-to-the-right");
    createCardsFromTheGivenNumber.appendChild(bottomSuitDiv);

    // Para hacer que cambie de color, los valores que se han introducido en la variable "content de cada uno, que se crean con el createTextNode
    if (card.suit == "♥" || card.suit == "♦") {
      topSuitDiv.classList.add("red");
      bottomSuitDiv.classList.add("red");
      NumberOrLetterDiv.classList.add("red");
    } else {
      topSuitDiv.classList.add("blue");
      bottomSuitDiv.classList.add("blue");
      NumberOrLetterDiv.classList.add("blue");
    }

    CARDS_APPEAR_HERE1.appendChild(createCardsFromTheGivenNumber);
  }
};

// Función get random
const getRandom = list => {
  return Math.floor(Math.random() * list.length);
};

const bubbleSort = arr => {
  let wall = arr.length - 1; //we start the wall at the end of the array
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //compare the adjacent positions, if the right one is bigger, we have to swap
      if (arr[index].value > arr[index + 1].value) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
      }
      index++;
    }
    wall--; //decrease the wall for optimization
  }
  return arr;
};

const selectSort = arr => {
  let min = 0;
  while (min < arr.length - 1) {
    for (let i = min + 1; i < arr.length; i++) {
      if (arr[min].value > arr[i].value) {
        let aux = arr[min];
        arr[min] = arr[i];
        arr[i] = aux;
      }
    }
    min++;
  }
  return arr;
};
