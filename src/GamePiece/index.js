import React from 'react';
import { ItemTypes } from '../constants';
import { DragSource } from 'react-dnd';

const pieceSource = {
  canDrag(props) {
    return props.canDrag(props.r, props.c);
  },
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag()
  }
}

const GamePiece = ( ({connectDragSource, content}) => {
  return connectDragSource(
    <div>
      <svg version="1.1"
        baseProfile="full"
        width="44" height="44"
        xmlns="http://www.w3.org/2000/svg"
      >        
        <circle cx="22" cy="22" r="20"
          stroke="black"
          fill={content === 'ball' ? "white" : "black"}
        />
        {content === 'ball' &&
          <text x="22" y="29" fontSize="20" textAnchor="middle" fill="black">B</text>
        }
      </svg>
    </div>
  );
});

export default DragSource(ItemTypes.BALL, pieceSource, collect)(GamePiece);