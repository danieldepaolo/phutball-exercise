import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { ItemTypes } from './constants';
import { DropTarget } from 'react-dnd';

import { pOneGoalLine, pTwoGoalLine } from './constants';

const Square = styled.div`
  border: 1px solid black;
  width: 44px;
  height: 44px;
`;

const squareTarget = {
  canDrop(props) {
    return props.canDrop(props.r, props.c);
  },
  drop(props, monitor) {
    props.moveBall(props.r, props.c);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const GameSpace = (props => {
  const {
    r,
    c,
    clicked,
    connectDropTarget,
    isOver,
    canDrop,
    children
  } = props;

  const dropHint = classNames({
    canDrop: isOver && canDrop(r, c),
    noDrop: isOver && !canDrop(r, c),
    goal: r <= pOneGoalLine || r >= pTwoGoalLine
  });

  return connectDropTarget (
    <div className={dropHint}>
      <Square onClick={e => clicked(r, c)}>
        {children}
      </Square>
    </div>
  );
});

export default DropTarget(ItemTypes.BALL, squareTarget, collect)(GameSpace);