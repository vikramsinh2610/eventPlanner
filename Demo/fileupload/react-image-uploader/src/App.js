// App.js
import React, { useState } from 'react';
import ImageForm from './components/ImageForm';
import ImageList from './components/ImageList';

const App = () => {
  const [images, setImages] = useState([]);

  const handleUpload = (imageUrl) => {
    setImages([...images, imageUrl]);
  };

  return (
    <div>
      <ImageForm onUpload={handleUpload} />
      <ImageList images={images} />
    </div>
  );
};

export default App;
