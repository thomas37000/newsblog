import axios from 'axios';

const urlCoinApi: string = 'https://rest.coinapi.io/v1/symbols';
const API_COIN: string | undefined = process.env.REACT_APP_API_COIN_KEY;

export const fetchCoins = async (query: string) => {
  const { data } = await axios.get(urlCoinApi, {
    params: {
      q: query,
      apikey: API_COIN,
    },
  });

  return data;
};
