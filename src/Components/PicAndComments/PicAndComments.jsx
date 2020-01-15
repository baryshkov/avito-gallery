import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../apiService/apiService';
import './PicAndComments.css';
import Spinner from '../Spinner';

const closeButtonSvg = (
  <svg
    className="modal__close-button"
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="1.35355" y1="0.646447" x2="19.3536" y2="18.6464" stroke="black" />
    <line x1="0.646447" y1="18.6464" x2="18.6464" y2="0.646446" stroke="black" />
  </svg>
);

const PicAndComments = ({ imageId, onClose, forwardedRef }) => {
  const testApi = new ApiService();

  const [imageUrl, setImageUrl] = useState(null);
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState('');
  const [userComment, setUserComment] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await testApi.getImageAndComments(imageId);
      setImageUrl(data.url);
      setComments(data.comments);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    console.table({ username, userComment });
    testApi.postComment(userComment, username, imageId);
  };

  const convertDate = epoch => new Date(epoch).toLocaleDateString('ru-RU');

  const fakeComment =
    comments && comments.length === 0 ? (
      <div className="comments-wrapper__comment">
        <div className="comments-wrapper__comment__text">Ваш комментарий будет первым!</div>
      </div>
    ) : null;

  return (
    <div className="container" ref={forwardedRef}>
      <button type="button" className="close-button" onClick={onClose}>
        {closeButtonSvg}
      </button>
      {(loading && <Spinner />) || (
        <>
          <div className="wrapper">
            <img className="image" src={imageUrl} alt="hi-res" />
          </div>
          <div className="comments-wrapper">
            {fakeComment ||
              (comments &&
                comments.map(({ date, id, text }) => {
                  const formattedDate = convertDate(date);
                  return (
                    <div className="comments-wrapper__comment" key={id}>
                      <time
                        className="comments-wrapper__comment__date"
                        dateTime={formattedDate
                          .split('.')
                          .reverse()
                          .join('-')}
                      >
                        {formattedDate}
                      </time>
                      <div className="comments-wrapper__comment__text">{text}</div>
                    </div>
                  );
                }))}
          </div>
          <form className="input-form" onSubmit={onSubmit}>
            <input
              className="input-form__name"
              type="text"
              name="name"
              placeholder="Ваше имя"
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              className="input-form__comment"
              type="text"
              name="comment"
              placeholder="Ваш комментарий"
              onChange={e => setUserComment(e.target.value)}
              required
            />
            <input type="submit" className="input-form__button" value="Оставить комментарий" />
          </form>
        </>
      )}
    </div>
  );
};

PicAndComments.propTypes = {
  imageId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

export default PicAndComments;
