import React, { useEffect, useState } from 'react';
import apiService from '../../apiService/apiService';
import Modal from '../Modal';
import './Gallery.css';

const Gallery = () => {
  const testApi = new apiService();
  const [previews, setPreviews] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await testApi.getAllPreviews();
      setPreviews(data);
    };
    fetchData();
  }, []);

  const onModalOpen = id => {
    setModalId(id);
    setModalOpened(true);
    console.log('opened', id);
  };

  const onModalClose = () => {
    console.log('closing');
    setModalOpened(false);
  };

  const loading = <span>loading...</span>;

  return (
    <>
      <div className="gallery">
        {(previews &&
          previews.map(({ id, url }) => (
            <img className="img" key={id} src={url} alt="photo" onClick={() => onModalOpen(id)} />
          ))) ||
          loading}
      </div>
      {modalOpened && <Modal onClose={() => setModalOpened(false)} id={modalId} />}
    </>
  );
};

export default Gallery;
