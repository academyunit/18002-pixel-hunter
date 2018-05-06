const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 18002;

const toJSON = (response) => response.json();

const checkStatus = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
};

const loadImage = (targetImage) => {
  return new Promise((onLoad, onError) => {
    const image = new Image();

    image.onload = () => onLoad(targetImage);
    image.onerror = () => onError(targetImage);
    image.src = targetImage;
  });
};

export const preCacheAssets = (data) => {
  const promises = [];

  data.forEach((question) => {
    return question.answers.forEach((answer) => {
      promises.push(loadImage(answer.image.url));
    });
  });

  return promises;
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON);
  }

  static loadResults(name) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name) {
    const options = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, options).then(checkStatus);
  }
}
