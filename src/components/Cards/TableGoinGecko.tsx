import ICoinGecko from '../../interfaces/Coins/GeckoApi/CoinsInterfaceGecko';

const TableCoinGecko = (props: { coin: ICoinGecko }) => {
  const { coin } = props;

  return (
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
                <tr className='bg-gray-100 border-b'>
                  <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                    {coin.id}
                  </td>
                  <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                    <img
                      className='w-8 h-8 rounded-full'
                      src={coin.image}
                      alt={coin.name}
                    />

                    {coin.name}
                  </td>
                  <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                    {coin.current_price}
                  </td>
                  <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                    {coin.market_cap}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCoinGecko;
