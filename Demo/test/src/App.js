import React, { useState } from 'react';
import Grid from './components/Grid';

function App() {
  const [columns, setColumns] = useState(3);

  const handleReset = () => {
    setColumns(3);
  };

  return (
    <div className="App">
      <h1>Dynamic Grid App</h1>
      <label>Number of Columns: </label>
      <select
        value={columns}
        onChange={(e) => setColumns(parseInt(e.target.value, 10))}
      >
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <Grid columns={columns} onReset={handleReset} />
    </div>
  );
}

export default App;
