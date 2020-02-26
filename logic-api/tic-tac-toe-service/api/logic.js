"use strict";

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

const checkAlmostWinCondition = game => {
  const almostWinOptions = new Map();
  for (let position of gamePositions) {
    const mappedPositionValue = position.map(index => game[index]);
    const positionValue = mappedPositionValue.reduce(
      (prevPos, nextPos) => prevPos + nextPos,
      0
    );
    if (positionValue === 2 || positionValue === -2) {
      for (let index of position) {
        if (game[index] === 0) {
          const key = positionValue === 2 ? "machine" : "player";
          almostWinOptions.set(key, index);
        }
      }
    }
  }
  if (almostWinOptions.has("machine")) {
    return almostWinOptions.get("machine");
  } else if (almostWinOptions.has("player")) {
    return almostWinOptions.get("player");
  }
  return false;
};

const getNextMove = (isFirst, game) => {
  // Check almost win condition
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

module.exports.getNextMoveService = async function(event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  try {
    const body = JSON.parse(event.body);
    const game = body.game;
    const isFirst = body.isFirst;
    const nextPos = getNextMove(isFirst, game);
    const response = {
      headers: headers,
      statusCode: 200,
      body: JSON.stringify({
        nextPosition: nextPos,
        input: game
      })
    };
    return response;
  } catch(e) {
    const response = {
      headers: headers,
      statusCode: 200,
      body: JSON.stringify(event)
    };
    return response;
  }
};
