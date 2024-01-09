import React, { useState } from 'react';
import Box from './Box';

const Grid = ({ columns, onReset }) => {
  const [boxes, setBoxes] = useState([]);
  const nextIndex = React.useRef(1);

  const addBox = () => {
    setBoxes([...boxes, nextIndex.current++]);
  };

  const removeBox = (indexToRemove) => {
    setBoxes(boxes.filter((index) => index !== indexToRemove));
  };

  return (
    <div>
      <button onClick={onReset}>Reset</button>
      <button onClick={addBox}>Add Box</button>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {boxes.map((index) => (
          <Box key={index} index={index} onRemove={() => removeBox(index)} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
