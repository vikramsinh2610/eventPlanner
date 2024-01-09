import React from 'react';

const Box = ({ index, onRemove }) => {
  return (
    <div className="box">
      <span>{index}</span>
      <button onClick={onRemove}>X</button>
    </div>
  );
};

export default Box;
