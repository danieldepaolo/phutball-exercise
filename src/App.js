import React, { Component } from 'react';
import './App.css';
import _ from 'underscore';
import styled from 'styled-components';

import { getDefaultBoard, getBallMoveOptions } from './functions';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';
import { pOneGoalLine, pTwoGoalLine } from './constants';

const GameHeader = styled.h2`
  text-align: center;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: getDefaultBoard(),
      ballPosition: {r: 10, c: 7},
      ballMoveOptions: [],
      playerTurn: 1,
      winner: null
    };
  }

  resetGame = () => {
    this.setState({
      board: getDefaultBoard(),
      ballPosition: {r: 10, c: 7},
      ballMoveOptions: [],
      playerTurn: 1,
      winner: null
    });
  }

  getWinner = ballPosition => {
    let winner = null;
    if (ballPosition.r <= pOneGoalLine) {
      winner = 2;
    } else if (ballPosition.r >= pTwoGoalLine) {
      winner = 1;
    }

    return winner;
  }

  // Put a man down if there isn't one there already
  onSpaceClicked = (r, c) => {
    const { board, ballPosition, playerTurn, winner } = this.state;

    let newPlayerTurn = playerTurn;
    let newBoard = board;
    if (!(ballPosition.r === r && ballPosition.c === c) && !newBoard[r][c] && r >= pOneGoalLine && r <= pTwoGoalLine) {
      newBoard[r][c] = 'man';
      newPlayerTurn = this.getOtherPlayer();
    }
    
    if (!winner) {
      this.setState({
        board: newBoard,
        ballMoveOptions: getBallMoveOptions(ballPosition, newBoard),
        playerTurn: newPlayerTurn
      });
    }
  }

  getOtherPlayer = () => {
    const { playerTurn } = this.state;
    return playerTurn === 1 ? 2 : 1;
  }

  switchTurn = () => {
    this.setState({
      playerTurn: this.getOtherPlayer()
    });
  }

  // Can only drag the ball!
  canDrag = (r, c) => {
    const { ballPosition, winner } = this.state;
    return !winner && r === ballPosition.r && c === ballPosition.c;
  }

  // Make sure target r,c doesn't have a piece on it
  // Also there must be men in between old position and new
  canDrop = (r, c) => {
    const { board, ballMoveOptions, winner } = this.state;
    return !winner && !board[r][c] && _.findWhere(ballMoveOptions, {r: r, c: c});
  }

  moveBall = (r, c) => {
    const { board, ballMoveOptions, playerTurn } = this.state;
    const newBallPosition = {r: r, c: c};
    const newWinner = this.getWinner(newBallPosition);
    let newBoard = board;
  
    const piecesToRemove = _.findWhere(ballMoveOptions, {r: r, c: c}).toRemove;
    piecesToRemove.forEach(piece => {
      newBoard[piece.r][piece.c] = null; // Remove men as a result of moving ball
    });
    const newBallMoveOptions = getBallMoveOptions(newBallPosition, newBoard);
    let newPlayerTurn = playerTurn;
    if (newBallMoveOptions.length === 0) {
      newPlayerTurn = this.getOtherPlayer();
    }

    this.setState({
      board: newBoard,
      ballPosition: newBallPosition,
      ballMoveOptions: newBallMoveOptions,
      playerTurn: newPlayerTurn,
      winner: newWinner
    });
  }

  render() {
    const { board, ballPosition, playerTurn, winner } = this.state;

    return (
      <section>
        <GameHeader>Phutball</GameHeader>
        <div className="App">
          <GameBoard
            ballPosition={ballPosition}
            boardState={board}
            canDrag={this.canDrag}
            canDrop={this.canDrop}
            moveBall={this.moveBall}
            spaceClicked={this.onSpaceClicked}
          />
          <GameInfo 
            switchTurn={this.switchTurn}
            playerTurn={playerTurn}
            resetGame={this.resetGame}
            winner={winner}
          />
        </div>
      </section>
    );
  }
}

export default App;
