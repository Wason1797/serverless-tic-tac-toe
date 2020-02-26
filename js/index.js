const playerTilePath = "/img/budismo.svg";
const machineTilePath = "/img/cover-tile.svg";
const emptyTile = "/img/deleted.png";
const tileTemplate = document.querySelector("#game-tile-template").innerHTML;
const gameSpace = document.querySelector("#game-space");

const game = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const usedPositions = new Set();

let isPlayerTurn = false;
const isMachineFirst = !isPlayerTurn;

const renderTile = (parentId, tilePath) => {
  const tile = document.getElementById(parentId);
  tile.innerHTML = buildTile(tileTemplate, {
    imgPath: tilePath
  });
};

const clickTile = event => {
  const parentId = Number.parseInt(event.target.parentNode.id);
  if (parentId !== "game-space") {
    if (!usedPositions.has(parentId) && isPlayerTurn) {
      playerPlay(parentId, game);
    }
  }
};

const buildTile = (tileTemplate, tileValues) =>
  Mustache.render(tileTemplate, tileValues);

const renderGameBoard = () => {
  for (let i = 0; i < 9; i++) {
    const newNode = document.createElement("div");
    newNode.classList.add("game-tile-container");
    newNode.id = i;
    newNode.onclick = clickTile;
    newNode.innerHTML = buildTile(tileTemplate, {
      imgPath: emptyTile
    });
    gameSpace.appendChild(newNode);
  }
};



const machinePlay = game => {
  const nextMove = getNextMove(isMachineFirst, game);
  renderTile(nextMove, machineTilePath);
  usedPositions.add(nextMove);
  game[nextMove] = 1;  
  const winCondition = checkWinCondition(game);
  if (winCondition) {
    console.log(winCondition);
    clearInterval(intervalId);
  } else {
    isPlayerTurn = true;
    checkTie(usedPositions);
  }
};

const playerPlay = (parentId, game) => {
  renderTile(parentId, playerTilePath);
  usedPositions.add(parentId);
  game[parentId] = -1;
  const winCondition = checkWinCondition(game);
  if (winCondition) {
    console.log(winCondition);
    clearInterval(intervalId);
  } else {
    isPlayerTurn = false;
    checkTie(usedPositions);
  }
};

const evaluateGame = () => {
  if (!isPlayerTurn) {
    machinePlay(game);
  }
};

renderGameBoard();

let intervalId = setInterval(evaluateGame, 1000);
