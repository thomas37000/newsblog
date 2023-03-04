import ICoinGeckoDetail from '../../interfaces/Coins/GeckoApi/CoinsInterfaceGeckoDetail';

const CardCoinDetail = (props: { coin: ICoinGeckoDetail }) => {
  const { coin } = props;

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
