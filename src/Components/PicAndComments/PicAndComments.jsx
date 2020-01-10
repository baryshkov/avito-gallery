import React, { useEffect, useState } from 'react';
import ApiService from '../../apiService/apiService';

const convertDate = epoch => new Date(epoch).toLocaleDateString('ru-RU');

const PicAndComments = ({ id }) => {
  const testApi = new ApiService();
  const [imageUrl, setImageUrl] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await testApi.getImageAndComments(id);
      console.log(data);
      setImageUrl(data.url);
      setComments(data.comments);
    };
    fetchData();
  }, [id]);
  return (
    <>
      <img src={imageUrl} />
      {/*<div className="comments">*/}
      {/*  {comments.map(({ date, id, text }) => {*/}
      {/*    <time dateTime={convertDate(date)}></time>;*/}
      {/*  })}*/}
      {/*</div>*/}
    </>
  );
};

export default PicAndComments;
