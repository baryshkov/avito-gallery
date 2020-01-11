import React, { useEffect, useState } from 'react';
import ApiService from '../../apiService/apiService';
import './PicAndComments.css';

const PicAndComments = ({ imageId }) => {
  const testApi = new ApiService();

  const [imageUrl, setImageUrl] = useState(null);
  const [comments, setComments] = useState(null);

  const [username, setUsername] = useState(null);
  const [userComment, setUserComment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await testApi.getImageAndComments(imageId);
      console.log(data);
      setImageUrl(data.url);
      setComments(data.comments);
    };
    fetchData();
  }, [imageId]);

  const validate = e => {
    const { value, name } = e.target;
    name === 'name' ? setUsername(value) : setUserComment(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.table({ username, userComment });
    testApi.postComment(userComment, username, imageId);
  };

  const convertDate = epoch => new Date(epoch).toLocaleDateString('ru-RU');

  const fakeComment =
    comments && comments.length === 0 ? (
      <div className="comments-wrapper__comment">
        <div className="comments-wrapper__comment__text">Ваш комментарий будет первым</div>
      </div>
    ) : null;

  return (
    <div className="container">
      <img className="image" src={imageUrl} alt="hi-res" />
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
          onChange={validate}
          required
        />
        <input
          className="input-form__comment"
          type="text"
          name="comment"
          placeholder="Ваш комментарий"
          onChange={validate}
          required
        />
        <input type="submit" className="input-form__button" value="Оставить комментарий" />
      </form>
    </div>
  );
};

export default PicAndComments;
