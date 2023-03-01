import { Link } from 'react-router-dom';
import ICoinGecko from '../../../interfaces/Coins/GeckoApi/CoinsInterfaceGecko';

interface ICoinGeckoList {
  coins: ICoinGecko[];
}

const HomeCoinList: React.FC<ICoinGeckoList> = ({ coins }) => {
  const randomCoins = coins.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div className='w-full max-w-md bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
          3 Cryptomonnaies à décourvir
        </h5>
      </div>
      <div className='flow-root'>
        <ul
          role='list'
          className='divide-y divide-gray-200 dark:divide-gray-700'
        >
          {randomCoins.map((coin, index) => (
            <li className='py-3 sm:py-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'>
              <Link to={`/coin/${coin.id}`} key={coin.id}>
                <div className='flex items-center space-x-4'>
                  <div className='flex-shrink-0'>
                    <img
                      className='w-8 h-8 rounded-full'
                      src={coin.image}
                      alt={coin.name}
                    />
                  </div>

                  <div className='w-full text-base font-semibold text-gray-900 dark:text-white'>
                    {coin.name}
                    <span className='ml-3 text-gray-400'>
                      {coin.symbol.toUpperCase()}
                    </span>
                  </div>

                  <div className='inline-flex items-center'>
                    {coin.price_change_percentage_24h.toFixed(1)}
                    <span className='font-medium ml-1'> %</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeCoinList;
