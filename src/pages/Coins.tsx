import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ICoin from '../interfaces/Coins/CoinSymbolsInterface';
import ICoinExchange from '../interfaces/Coins/CoinExchangeInterface';
import CardCoin from '../components/CardCoins';

const Coins: React.FunctionComponent = () => {
  const [coins, setCoins] = useState<ICoinExchange[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const urlCoinApi: string = 'https://rest.coinapi.io/v1/exchanges';
  const coinTokens: string | undefined = process.env.REACT_APP_API_COIN_KEY;

  useEffect(() => {
    const loadCoins = () => {
      setLoading(true);
      axios
        .get(`${`${urlCoinApi}?apikey=${coinTokens}`}`)
        .then((res) => {
          setError('');
          setCoins(res.data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadCoins();
  }, []);

  const fetchCoins =
    coins &&
    coins.slice(0, 12).map((coin, i) => {
      return <CardCoin key={i} coin={coin} />;
    });

  return (
    <>
      <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-sky-800'>
        Les Cryptos du moment
      </h2>

      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchCoins}</div>
    </>
  );
};

export default Coins;
