import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import requestError from '../assets/429.png';
import ICoinGecko from '../interfaces/Coins/GeckoApi/CoinsInterfaceGecko';
import TableCoinGecko from '../components/Cards/TableGoinGecko';

const CoinsGecko: React.FunctionComponent = () => {
  const [coins, setCoins] = useState<ICoinGecko[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const urlCoinApi: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false';

  useEffect(() => {
    const loadCoins = () => {
      setLoading(true);

      axios
        .get(urlCoinApi)
        .then((res) => {
          setError('');
          setCoins(res.data);
          console.log(res.data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadCoins();
  }, []);

  if (loading) return <p>"Loading ..."</p>;
  if (error !== '')

    return (
      <div className='max-w-sm overflow-hidden rounded shadow-lg api-error'>
        <img className='w-full' src={requestError} alt='429 too many request' />
        <div className='px-6 py-4'>
          <div
            className='relative py-3 text-red-700 bg-red-100 border border-red-400 rounded px4'
            role='alert'
          ></div>
        </div>
      </div>
    );

  return (
    <div className='mt-4 crypto'>
      <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-sky-400'>
        Les Cryptos du moment
      </h2>
      <TableCoinGecko coins={coins} />
    </div>
  );
};

export default CoinsGecko;
