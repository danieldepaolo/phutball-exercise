import React, { Component } from 'react';
import styled from 'styled-components';

import GamePiece from './GamePiece';
import GameSpace from './GameSpace';

const BoardRow = styled.div`
  display: flex;
`;
const PlayerHeader = styled.h4`
  text-align: center;
`;
const Board = styled.div`
  margin: 0.5em 2em;
`;

class GameBoard extends Component {
  render() {
    const { ballPosition, boardState, spaceClicked, moveBall, canDrag, canDrop } = this.props;

    return (
      <div>
        <PlayerHeader>Player 1 Goal</PlayerHeader>
        <Board>
          {boardState.map( (row, i) => {
            return (
              <BoardRow key={i}>
                {row.map( (space, j) => {
                  const pieceId = i + '.' + j;
                  const atBallPosition = (i === ballPosition.r && j === ballPosition.c);
                  const content = atBallPosition ? 'ball' : space;

                  return (
                    <GameSpace key={pieceId} r={i} c={j} clicked={spaceClicked} moveBall={moveBall} canDrop={canDrop}>
                      {(atBallPosition || space) && <GamePiece id={pieceId} r={i} c={j} canDrag={canDrag} content={content} />}
                    </GameSpace>
                  );
                })}
              </BoardRow>
            );
          })}
        </Board>
        <PlayerHeader>Player 2 Goal</PlayerHeader>
      </div>
    );
  }
}

export default GameBoard;
