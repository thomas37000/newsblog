export default interface ICoinGecko {
  market_cap_rank: number; // id number, colonne #
  id: string; // id name
  image: string;
  name: string;
  symbol: string; // name en toUppercase(), ex: bitcoin = BTC
  current_price: number; // current.price
  price_change_24h: number;
  price_change_percentage_24h: number; // priceChange={coin.price_change_percentage_24h}
  market_cap_change_percentage_24h: number; // colonne 24 h
  atl_change_percentage: number; // colonne 7 days
  market_cap: number; // marketcap={coin.total_volume}
  total_volume: number; // volume={coin.market_cap}
}
