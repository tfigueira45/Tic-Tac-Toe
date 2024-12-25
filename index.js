const boxes = document.querySelectorAll(".box");
const firstInput = document.querySelector("#first");
const secondInput = document.querySelector("#second");
const newGameButton = document.querySelector(".newGame");
let user = Boolean(Math.round(Math.random()));
let users;

function gameMap(player) {
  return Array.from(document.querySelectorAll(`.${player}`)).map(function (
    item
  ) {
    return Array.from(boxes).indexOf(item.parentElement);
  });
}

function getWin(map){
  for(i = 0; i < map.length; i++){
    const pos = map[i]

    for(j = 0; j < map.length; j++){
      const item = map[j]
      
      if(pos != item) {
        console.log(pos, item)
        const x = [item, pos].sort((a,b) => a - b)
        const y = Math.abs(item - pos)
        const psbWin = [...x, x[1] + y]

        if([1, 2, 3, 4].includes(y)){

          if (map.includes(pos && item && psbWin[2])) {
            console.log(psbWin)
            return [true, psbWin]
          }
        }
      }
    }
  }
}

function check() {
  let gameMapBall = gameMap("ball")
  let gameMapX = gameMap("x")
  getWin(gameMapBall)
  getWin(gameMapX)

  if (gameMapBall.length + gameMapX.length !== 9) {
    return [false];
  }

  return []

}

function fillAllBoxes() {
  boxes.forEach((item) => {
    item.classList.add("fakeFill");
  });
}

function winAnimation(user,winMap){
  const color = user ? 'blue' : 'red'
  winMap.forEach((i) => {
    boxes[i].classList.add('win', color)
  })
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
        if (check()[0] === true) {
          fillAllBoxes();
          document.querySelector(".info").textContent = `${
            users[String(user)]
          } venceu o jogo!`;
          winAnimation(user,check()[1])
          newGameButton.classList.add("show");
        } else if (check()[0] === false) {
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
    box.classList.remove("fakeFill","win","red","blue");
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