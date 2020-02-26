const columns = [
  [1, 4, 7],
  [2, 5, 8],
  [0, 3, 6]
];

const rows = [
  [3, 4, 5],
  [6, 7, 8],
  [0, 1, 2]
];

const diagonal = [
  [0, 4, 8],
  [2, 4, 6]
];

const gamePositions = [...rows, ...diagonal, ...columns];

const checkWinCondition = game => {
  for (let position of gamePositions) {
    const positionValue = position
      .map(index => game[index])
      .reduce((prevPos, nextPos) => prevPos + nextPos, 0);
    if (positionValue === 3) {
      return "Machine Wins";
    } else if (positionValue === -3) {
      return "Player Wins";
    }
  }
  return false;
};

const checkTie = usedPositions => {
  if (usedPositions.size === 9) {
    console.log("Tie");
    clearInterval(intervalId);
  }
};
