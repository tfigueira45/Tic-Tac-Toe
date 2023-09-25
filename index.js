const boxes = document.querySelectorAll(".box");
const firstInput = document.querySelector("#first");
const secondInput = document.querySelector("#second");
const newGameButton = document.querySelector(".newGame");
let user = Boolean(Math.round(Math.random()));
let users;

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function gameMap(player) {
  return Array.from(document.querySelectorAll(`.${player}`)).map(function (
    item
  ) {
    return Array.from(boxes).indexOf(item.parentElement);
  });
}

function check() {
  let bIndex = 0;
  let xIndex = 0;
  for (let i = 0; i < wins.length; i++) {
    let gameMapBall = gameMap("ball");
    let gameMapX = gameMap("x");
    let winsStr = wins[i];
    winsStr.map((item) => {
      if (gameMapBall.includes(item)) {
        bIndex++;
      }else if(gameMapX.includes(item)){
        xIndex++
      }
    });
    if (xIndex === 3 || bIndex === 3) {
      return true;
    }
    xIndex = 0
    bIndex = 0
  }
  if (gameMap("ball").length + gameMap("x").length === 9) {
    return undefined;
  } else {
    return false;
  }
}

function fillAllBoxes() {
  boxes.forEach((item) => {
    item.classList.add("fakeFill");
  });
}

function showPopup() {
  document.querySelector(".popup_box").classList.add("show");
  document.querySelector(".startButton").addEventListener("click", function () {
    if (firstInput.value && secondInput.value) {
      let playerOne = firstInput.value;
      let playerTwo = secondInput.value;
      users = { true: playerOne, false: playerTwo };
      document.querySelector(".popup_box").classList.remove("show");
      newGameButton.classList.remove("show");
      inicializeGame();
    }
  });
}

function inicializeGame() {
  document.querySelector(".info").textContent = `É a vez de ${
    users[String(user)]
  }`;
  boxes.forEach(function (box) {
    box.addEventListener("click", function () {
      let child = box.querySelector("div");
      if (
        !child.classList.contains("ball") &&
        !child.classList.contains("x") &&
        !box.classList.contains("fakeFill")
      ) {
        child.classList.add(user ? "ball" : "x");
        if (check() === true) {
          fillAllBoxes();
          document.querySelector(".info").textContent = `${
            users[String(user)]
          } venceu o jogo!`;
          newGameButton.classList.add("show");
        } else if (check() === false) {
          user = !user;
          document.querySelector(".info").textContent = `É a vez de ${
            users[String(user)]
          }`;
        } else {
          document.querySelector(".info").textContent = `Empatou!`;
          newGameButton.classList.add("show");
        }
      }
    });
  });
}

function newGame() {
  boxes.forEach(function (box) {
    box.classList.remove("fakeFill");
  });
  document.querySelectorAll(".ball").forEach(function (item) {
    item.classList.remove("ball");
  });
  document.querySelectorAll(".x").forEach(function (item) {
    item.classList.remove("x");
  });
  showPopup();
}

newGameButton.addEventListener("click", newGame);

showPopup();



