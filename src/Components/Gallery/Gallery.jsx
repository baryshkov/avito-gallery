import React, { useEffect, useState } from 'react';
import ApiService from '../../apiService/apiService';
import Modal from '../Modal';
import Spinner from '../Spinner';
import './Gallery.css';

const Gallery = () => {
  const testApi = new ApiService();
  const [previews, setPreviews] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await testApi.getAllPreviews();
      setPreviews(data);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onModalOpen = id => {
    setModalId(id);
    setModalOpened(true);
  };

  return (
    <>
      <div className="gallery">
        {(previews &&
          previews.map(({ id, url }) => (
            <img className="img" key={id} src={url} alt="preview" onClick={() => onModalOpen(id)} />
          ))) || <Spinner />}
      </div>
      {modalOpened && <Modal onClose={() => setModalOpened(false)} id={modalId} />}
    </>
  );
};

export default Gallery;
