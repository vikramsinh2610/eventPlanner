// src/App.tsx
import React, { useState } from 'react';
import Cards from './Cards';
import './App.css';
import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';

function App() {
  const [columns, setColumns] = useState<number>(3);
  const [boxes, setBoxes] = useState<number[]>([]);

  const handleColumnChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setColumns(event.target.value as number);
  };

  const handleAddBox = () => {
    setBoxes((prev) => [...prev, prev.length + 1]);
  };

  const handleRemoveBox = (index: number) => {
    setBoxes((prev) => prev.filter((box) => box !== index));
  };

  const handleReset = () => {
    setColumns(3);
    setBoxes([]);
  };

  return (
    <div className="App">
      <Box mb={"30px"} display={"flex"} className="cardsForm">
        <FormControl style={{ minWidth: "200px" }}>
          <Select
            value={columns}
            onChange={(event: any) => handleColumnChange(event)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddBox}>Add Box</Button>
        <Button variant="contained" onClick={handleReset}>Reset</Button>
      </Box>
      {/* <Box className="grid-container" style={{ display: "grid", gap: "20px", gridTemplateColumns: boxes.length === 1 ? "1fr" : boxes.length === 2 ? "1fr 1fr" : "1fr 1fr 1fr" }}> */}
      <Box className="grid-container" style={{ display: "grid", gap: "20px", gridTemplateColumns: columns === 1 ? "1fr" : columns === 2 ? "1fr 1fr" : "1fr 1fr 1fr" }}>
        {boxes.map((box, index) => (
          <Cards
            key={box}
            index={index + 1}
            handleRemove={() => handleRemoveBox(index + 1)}
            columns={columns}
          />
        ))}
      </Box>
    </div>
  );
}

export default App;
