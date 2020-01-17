export default class ApiService {
  API_BASE = 'https://boiling-refuge-66454.herokuapp.com/images/';

  getAllPreviews = async () => {
    const response = await fetch(`${this.API_BASE}`);
    if (!response.ok) {
      throw new Error(
        `Could not fetch ${this.API_BASE}, received an error with response status 
        ${response.status}`,
      );
    }
    return response.json();
  };

  getImageAndComments = async imageId => {
    const response = await fetch(`${this.API_BASE}${imageId}`);
    if (!response.ok) {
      throw new Error(`Could not fetch big image, received an error with response status 
        ${response.status}`);
    }
    return response.json();
  };

  postComment = async (comment, name, imageId) => {
    const commentUrl = `${this.API_BASE}${imageId}/comments`;

    const commentInfo = {
      name,
      comment,
    };

    const response = await fetch(commentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentInfo),
    });
    return response;
  };
}
