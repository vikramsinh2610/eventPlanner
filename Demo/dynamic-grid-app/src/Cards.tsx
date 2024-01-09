// src/Box.tsx
import React from 'react';
import { Button } from '@mui/material';
import './Box.css';

type BoxProps = {
  index: number;
  handleRemove: () => void;
  columns: number;
};

const Box: React.FC<BoxProps> = ({ index, handleRemove, columns }) => {
  const columnWidth = `${100 / columns}%`;

  return (
    <div className="box">
      <div>{index}</div>
      <Button variant="contained" onClick={handleRemove}>X</Button>
    </div>
  );
};

export default Box;
