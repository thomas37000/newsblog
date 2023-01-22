export default interface ICoinGecko {
  id: string;
  name: string;
  current_price: number; // current.price
  symbol: string;
  image: string;
  price_change_24h: number;
  price_change_percentage_24h: number; // priceChange={coin.price_change_percentage_24h}
  market_cap: number; // marketcap={coin.total_volume}
  total_volume: number; // volume={coin.market_cap}
}
