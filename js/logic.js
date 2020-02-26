const columns = [
  [1, 3, 7],
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

const positionGroupsFirst = [diagonal, rows, columns];
const positionGroupsSeccond = [rows, diagonal, columns];

const gamePositions = [...rows, ...diagonal, ...columns];

const getEmptyGamePositions = game => {
  return new Set(
    game
      .map((item, index) => {
        return item === 0 ? index : -1;
      })
      .filter(item => item !== -1)
  );
};

const checkWinCondition = game => {
  for (let position of gamePositions) {
    const positionValue = position
      .map(index => game[index])
      .reduce((prevPos, nextPos) => prevPos + nextPos);
    if (positionValue === 3) {
      return "Machine Wins";
    } else if (positionValue === -3) {
      return "Player Wins";
    }
  }
  return false;
};

const checkAlmostWinCondition = game => {
  for (let position of gamePositions) {
    const mappedPositionValue = position.map(index => game[index]);
    const positionValue = mappedPositionValue.reduce(
      (prevPos, nextPos) => prevPos + nextPos
    );
    if (positionValue === 2 || positionValue === -2) {
      for (let index of position) {
        if (game[index] === 0) {
          return index;
        }
      }
    }
  }
  return false;
};

const getNextMove = (isFirst, game) => {
  // Check win condition
  const empty = getEmptyGamePositions(game);
  const almostWinCondition = checkAlmostWinCondition(game);

  if (Number.isInteger(almostWinCondition)) {
    return almostWinCondition;
  }
  const positionGroups = isFirst ? positionGroupsFirst : positionGroupsSeccond;

  for (let group of positionGroups) {
    for (let position of group) {
      for (let index of position) {
        if (empty.has(index)) {
          return index;
        }
      }
    }
  }
};
