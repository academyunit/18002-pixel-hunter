const API_URL = `https://es.dump.academy/pixel-hunter/questions`;

const loadImages = (answer) => {
  return new Promise((onLoad, onError) => {
    const image = new Image();
    image.onload = () => onLoad(image);
    image.onerror = () => onError(`Cannot load image `);
    image.src = answer.image.url;

    console.log(image);
  });
};

export default (callback) => {
  const whenDataLoaded = fetch(API_URL);

  whenDataLoaded
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}!`);
      }
      return response.json();
    })
    .then((data) => {
      // Так Promise работать будет на предзагрузку картинок? Или в return должен Promise возвращаться явно?
      data.forEach((question) => {
        question.answers.forEach((answer) => {
          loadImages(answer);
        });
      });

      return data;
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => console.log(error))
  ;
};