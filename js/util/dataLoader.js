const API_URL = `https://es.dump.academy/pixel-hunter/questions`;

export default (callback) => {
  const whenDataLoaded = fetch(API_URL);

  whenDataLoaded
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}!`);
      }
      return response.json();
    })
    .then((data) => callback(data))
    .catch((error) => console.log(error))
  ;
};