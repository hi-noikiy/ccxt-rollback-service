import { Ticker } from 'ccxt';

export interface ITicker extends Ticker {
  bidVolume?: number;
}
