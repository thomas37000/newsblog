/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ICoinGecko from '../../interfaces/Coins/GeckoApi/CoinsInterfaceGecko';

interface ICoinGeckoTable {
  coins: ICoinGecko[];
}

const TableCoinGecko: React.FC<ICoinGeckoTable> = ({ coins }) => {
  const [filters, setFilters] = useState({
    highPrice: false,
    lowPrice: false,
    asc: false,
    desc: false,
  });

  const [filteredCoins, setfilteredCoins] = useState(coins);

  useEffect(() => {
    let filtered = [...coins];

    if (filters.highPrice) {
      filtered = filtered.sort((a, b) => b.current_price - a.current_price);
    }
    if (filters.lowPrice) {
      filtered = filtered.sort((a, b) => a.current_price - b.current_price);
    }
    if (filters.asc) {
      filtered = filtered.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (filters.desc) {
      filtered = filtered.sort((a, b) => {
        if (b.name < a.name) return -1;
        if (b.name > a.name) return 1;
        return 0;
      });
    }
    setfilteredCoins(filtered);
  }, [filters, coins]);

  return (
    <>
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
                      className='flex items-center px-6 py-4 text-sm font-medium text-left text-gray-900'
                    >
                      Coin
                      <svg
                        onClick={() =>
                          setFilters({
                            ...filters,
                            asc: !filters.asc,
                          })
                        }
                        className='w-6 h-6 dark:text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z'
                        ></path>
                      </svg>
                      <svg
                        onClick={() =>
                          setFilters({
                            ...filters,
                            desc: !filters.desc,
                          })
                        }
                        className='w-6 h-6 dark:text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z'
                        ></path>
                      </svg>
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                    >
                      Price
                      <svg
                        onClick={() =>
                          setFilters({
                            ...filters,
                            highPrice: !filters.highPrice,
                          })
                        }
                        className='w-6 h-6 dark:text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z'
                        ></path>
                      </svg>
                      <svg
                        onClick={() =>
                          setFilters({
                            ...filters,
                            lowPrice: !filters.lowPrice,
                          })
                        }
                        className='w-6 h-6 dark:text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z'
                        ></path>
                      </svg>
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                    >
                      1h
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                    >
                      24h
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                    >
                      7 days
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                    >
                      24h Volume
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                    >
                      Mkt CAp
                    </th>
                    <th
                      scope='col'
                      className='flex items-center px-6 py-4 text-sm font-medium text-left text-gray-900'
                    >
                      last 7 Days
                      <svg
                        className='w-6 h-6 ml-2 dark:text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                        ></path>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoins.map((coin, index) => (
                    <tr
                      key={index}
                      className='bg-gray-100 border-b hover:bg-gray-50 dark:hover:bg-gray-600'
                    >
                      <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                        {coin.market_cap_rank}
                      </td>
                      <Link to={`/coin/${coin.id}`} key={coin.id}>
                        <td className='flex content-center px-6 py-4 text-sm text-gray-900 whitespace-nowrap'>
                          <img
                            className='w-6 h-6 mr-2 rounded-full'
                            src={coin.image}
                            alt={coin.name}
                          />
                          {coin.name}
                          <div className='ml-2 font-light'>
                            {coin.symbol.toUpperCase()}
                          </div>
                        </td>
                      </Link>
                      <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                        <span className='font-medium'>$ </span>
                        {coin.current_price.toLocaleString('en-US')}
                      </td>
                      <td
                        className={
                          coin.price_change_percentage_24h <= 0
                            ? 'text-red-500'
                            : 'text-green-500'
                        }
                      >
                        {coin.price_change_percentage_24h.toFixed(1)}
                        <span className='font-medium'> %</span>
                      </td>
                      <td
                        className={
                          coin.market_cap_change_percentage_24h <= 0
                            ? 'text-red-500'
                            : 'text-green-500'
                        }
                      >
                        {coin.market_cap_change_percentage_24h.toFixed(1)}

                        <span className='font-medium'> %</span>
                      </td>
                      <td
                        className={
                          coin.atl_change_percentage / 10000 <= 0
                            ? 'text-red-500'
                            : 'text-green-500'
                        }
                      >
                        {(coin.atl_change_percentage / 10000).toFixed(1)}
                        <span className='font-medium'> %</span>
                      </td>
                      <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                        <span className='font-medium'>$ </span>
                        {coin.current_price.toLocaleString('en-US')}
                      </td>
                      <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                        <span className='font-medium'>$ </span>
                        {coin.market_cap.toLocaleString('en-US')}
                      </td>
                      <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                        {/* {coin.market_cap} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableCoinGecko;
