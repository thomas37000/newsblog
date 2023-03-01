import ICoinGeckoDetail from '../../interfaces/Coins/GeckoApi/CoinsInterfaceGeckoDetail';

const CardCoinDetail = (props: { coin: ICoinGeckoDetail }) => {
  const { coin } = props;

  // const coinDetail = `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`;

  return (
    <div className='my-6'>
      <div className='flex items-center gap-2'>
        <h1 className='mb-2 text-2xl font-bold capitalize'>{coin.name}</h1>
      </div>
      <p>{coin.description?.en}</p>
    </div>
  );
};

export default CardCoinDetail;
