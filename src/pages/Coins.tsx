import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ICoin from '../interfaces/Coins/CoinSymbolsInterface';
import ICoinExchange from '../interfaces/Coins/CoinExchangeInterface';
import CardCoin from '../components/CardCoins';
import '../App.css';
import requestError from '../assets/429.png';

const Coins: React.FunctionComponent = () => {
  const [coins, setCoins] = useState<ICoinExchange[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

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

          console.log('nombre appels coinApi', setCount(count + 1));
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

  if (loading) return <p>"Loading ..."</p>;
  if (error !== '')
    return (
      <div className='max-w-sm overflow-hidden rounded shadow-lg api-error'>
        <img className='w-full' src={requestError} alt='429 too many request' />
        <div className='px-6 py-4'>
          <div
            className='relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded'
            role='alert'
          >
            <span className='block sm:inline'>
              Problème avec l' Api qui limite les requêtes à 100 appels / jour
              en mode gratuit
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div className='mt-4 crypto'>
      <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-sky-800'>
        Les Cryptos du moment
      </h2>

      <h3>{count}</h3>

      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchCoins}</div>
    </div>
  );
};

export default Coins;
