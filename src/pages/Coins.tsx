import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ICoin from '../interfaces/Coins/CoinsApi/CoinSymbolsInterface';
import ICoinExchange from '../interfaces/Coins/CoinsApi/CoinExchangeInterface';
import CardCoin from '../components/Cards/CardCoins';
import '../App.css';
import requestError from '../assets/429.png';
import ICoinExchangeRate from '../interfaces/Coins/CoinsApi/CoinsExchangeRate';

const Coins: React.FunctionComponent = () => {
  // const [coins, setCoins] = useState<ICoinExchangeRate[]>([]);
  const [coins, setCoins] = useState<ICoinExchange[]>([]);
  const [time, setTime] = React.useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const urlCoinApi: string = 'https://rest.coinapi.io/v1/exchanges';
  //'https://rest.coinapi.io/v1/exchangerate/asset_id_base=BTC/asset_id_quote=USD';
  const urlCoinApiRate: string =
    'https://rest.coinapi.io/v1/exchangerate/BTC/USD';
  const coinTokens: string | undefined = process.env.REACT_APP_API_COIN_KEY;

  const options = {
    hostname: 'https://rest.coinapi.io',
    path: '/v1/exchangerate/BTC/USD',
    headers: { 'X-CoinAPI-Key': `${coinTokens}` },
  };

  useEffect(() => {
    const loadCoins = () => {
      setLoading(true);

      axios
        .get(`${`${urlCoinApi}?apikey=${coinTokens}`}`)
        // v1/exchangerate/{asset_id_base}/{asset_id_quote}?time={time}
        // .get(`${`${urlCoinApiRate}?time=${time}?apikey=${coinTokens}`}`)
        .then((res) => {
          setError('');
          setCoins(res.data);
          setTime(new Date().toLocaleTimeString());
          console.log(res.data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadCoins();
  }, []);

  // const fetchCoins =
  //   coins &&
  //   coins.slice(0, 12).map((coin, i) => {
  //     return <CardCoin key={i} coin={coin} />;
  //   });

  const fetchCoins =
    coins &&
    coins.map((coin, i) => {
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

      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchCoins}</div>
    </div>
  );
};

export default Coins;
