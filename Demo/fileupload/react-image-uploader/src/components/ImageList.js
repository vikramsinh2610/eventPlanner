// ImageList.js
import React from 'react';

const ImageList = ({ images }) => {
  return (
    <div>
      <h2>Image List</h2>
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={`Uploaded ${index}`} style={{ width: '100px', height: 'auto' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
