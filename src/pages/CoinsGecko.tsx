import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import requestError from '../assets/429.png';
import ICoinGecko from '../interfaces/Coins/GeckoApi/CoinsInterfaceGecko';
import TableCoinGecko from '../components/Cards/TableGoinGecko';

const CoinsGecko: React.FunctionComponent = () => {
  const [coins, setCoins] = useState<ICoinGecko[]>([]);
  const [time, setTime] = React.useState<string>('');
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

  // TODO afficher le component avec les props !
  const fetchCoins = (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full'>
              <thead className='bg-white border-b'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                  >
                    #
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                  >
                    Coin
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                  >
                    Price
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                  >
                    Mkt CAp
                  </th>
                </tr>
              </thead>
              <tbody>
                {coins &&
                  coins.map((coin) => (
                    <tr className='bg-gray-100 border-b'>
                      <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                        <img
                          className='w-8 h-8 rounded-full'
                          src={coin.image}
                          alt={coin.name}
                        />
                      </td>
                      <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                        {coin.name}
                      </td>
                      <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                        {coin.current_price}{' '}
                        <span className='text-sm font-medium text-gray-900 whitespace-nowrap'>
                          $
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                        {coin.market_cap}{' '}
                        <span className='text-sm font-medium text-gray-900 whitespace-nowrap'>
                          $
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

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
      <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-sky-800'>
        Les Cryptos du moment
      </h2>

      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchCoins}</div>
    </div>
  );
};

export default CoinsGecko;
