export default interface ICoinExchange {
  data_end: string;
  data_orderbook_end: string;
  data_orderbook_start: string;
  data_quote_end: string;
  data_quote_start: string;
  data_start: string;
  data_symbols_count: number;
  data_trade_end: string;
  data_trade_start: string;
  exchange_id: string;
  name: string;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
  website: string;
  // image: ICoinExchangeIcon;
}

export interface ICoinExchangeIcon {
  exchange_id: string;
  url: string;
}
