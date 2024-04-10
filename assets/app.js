let startGame = false;
level = 0;

let gameSequence = [];
let userSequence = [];

let btns = ["red", "green", "purple", "yellow"];
let h2 = document.querySelector("h2");
let p = document.querySelector("p");
let allBtns = document.querySelectorAll(".btn");

document.addEventListener("keypress", function () {
  if (startGame == false) {
    startGame = true;

    levelUpBtn();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 150);
}

function levelUpBtn() {
  userSequence = [];
  level++;
  h2.style.display = "none";
  p.innerText = `Level - ${level}`;

  let randomIndex = Math.floor(Math.random() * 3);
  let randomColor = btns[randomIndex];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSequence.push(randomColor);
  console.log(gameSequence);

  gameFlash(randomBtn);
}

function checkColor(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUpBtn, 1000);
    }
  } else {
    h2.style.display = "initial";
    h2.innerText = `Game Over! Please press any key to restart the game`;
    p.innerHTML = `Your Score was ${level}`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    reset();
  }
}

function pressBtn() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSequence.push(userColor);

  checkColor(userSequence.length - 1);
}

for (btn of allBtns) {
  btn.addEventListener("click", pressBtn);
}

function reset() {
  startGame = false;
  level = 0;
  gameSequence = [];
  userSequence = [];
}
