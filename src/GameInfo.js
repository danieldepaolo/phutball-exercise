import React, { Component } from 'react';
import styled from 'styled-components';

const WinnerMsg = styled.div`
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  margin-top: 1em;
  padding: 0.4em;
`;

class GameInfo extends Component {
  render() {
    const { playerTurn, switchTurn, winner, resetGame } = this.props;

    return (
      <div>
        <h4>Game Information</h4>
        {!winner &&
          <div>
            <p>Current turn: Player {playerTurn}</p>
            <button onClick={e => switchTurn()}>Pass Turn</button>
          </div>
        }
        {winner &&
          <WinnerMsg>
            <p style={{color: 'darkgreen'}}>
              Player {winner} wins!!
            </p>
          </WinnerMsg>
        }
        <button style={{marginTop: '1em'}} onClick={e => resetGame()}>New Game</button>
      </div>
    );
  }
}

export default GameInfo;
