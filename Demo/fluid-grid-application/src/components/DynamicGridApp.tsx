import React, { useState } from 'react';
import './DynamicGridApp.css';

function DynamicGridApp() {
  const [columns, setColumns] = useState(3);
  const [boxes, setBoxes] = useState([] as number[]);

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setColumns(parseInt(event.target.value));
  };

  const handleAddBox = () => {
    setBoxes([...boxes, boxes.length + 1]);
  };

  const handleRemoveBox = (index: number) => {
    setBoxes(boxes.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setColumns(3);
    setBoxes([]);
  };


  return (
    <div className="dynamic-grid-app">
      <h1>Fluid grid application</h1>
      <div className="controls">
        <label>Select Number of Columns:</label>
        <select value={columns} onChange={handleColumnChange}>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button onClick={handleAddBox}>Add Box</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="grid" style={{ display: "grid", gap: "20px", gridTemplateColumns: columns === 1 ? "1fr" : columns === 2 ? "1fr 1fr" : "1fr 1fr 1fr" }}>
        {boxes.map((box, index) => (
          <div key={index} className="box">
            <span>{box}</span>
            <button onClick={() => handleRemoveBox(index)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DynamicGridApp;
