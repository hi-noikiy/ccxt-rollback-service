export interface ITrade {
  pair: string; // @TODO add real pairs types like 'BTC/EUR' for type safety
  exchange: string; // @TODO add real exchanges types like 'kraken' for type safety
  volume: number;
  price: number;
  direction: 'buy' | 'sell';
}