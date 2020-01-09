import React, { useEffect, useState } from 'react';
import apiService from '../../apiService/apiService';
import './Gallery.css';

const Gallery = () => {
  const testApi = new apiService();
  const [previews, setPreviews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await testApi.getAllPreviews();
      setPreviews(data);
    };
    fetchData();
  }, []);

  const loading = <span>loading...</span>;

  return (
    <div className="gallery">
      {(previews &&
        previews.map(({ id, url }) => <img className="img" key={id} src={url} alt="photo" />)) ||
        loading}
    </div>
  );
};

export default Gallery;
