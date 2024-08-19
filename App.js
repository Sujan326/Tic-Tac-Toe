//Access the buttons
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let msgConatiner = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

//Player-x, Player-O
let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enabledBoxes();
  msgConatiner.classList.add("hide");
};

//Adding events for all boxes/buttons
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //Player-O
      box.innerText = "O";
      turnO = false;
    } else {
      //Player-X
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; //Once button clicked cant be changed.

    checkWinner();
  });
});

//Disable all the boxes after winner
const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//Enable all the boxes after winner
const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//SHow winner --> position 1 value is always the winner
const showWinner = (winner) => {
  message.innerText = `Congratulations, Player-${winner} is the Winner.`;
  msgConatiner.classList.remove("hide");
  disabledBoxes();
};

//Check the winning patterns with the above array
const checkWinner = () => {
  let isDraw = true;

  for (let pattern of winPatterns) {
    //Access each win pattern.
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        // console.log("Winner", pos1Value);
        showWinner(pos1Value);
        return;
      }
    }
  }
  
  // Check for a draw
  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false;
    }
  });

  if (isDraw) {
    message.innerText = "It's a Draw!";
    msgConatiner.classList.remove("hide");
    disabledBoxes();
  }
};

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
