const postNewGame = async () => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const data = { name: 'Super Video Game Ultimate IV' };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response.json();
};

const getNewGameId = () => postNewGame()
  .then((data) => {
    const id = data.result.substring(14, 34);
    return id;
  });

export { getNewGameId as default };