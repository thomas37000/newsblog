// import ICoin from '../interfaces/Coins/CoinSymbolsInterface';
import ICoinExchange from '../interfaces/Coins/CoinExchangeInterface';
import ICoinExchangeIcon from '../interfaces/Coins/CoinsExhangeIconInterface';

const CardCoin = (props: { coin: ICoinExchange }) => {
  const { coin} = props;

  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
      {/* <img src={coin.image } alt={coin.name} /> */}

      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {coin.name}
        </h5>

        {/* <div className='mb-2'>{coin.price}</div> */}
        <div className='mb-2'>{coin.data_end}</div>
        <div className='mb-2'>{coin.website}</div>
      </div>
    </div>
  );
};

export default CardCoin;
