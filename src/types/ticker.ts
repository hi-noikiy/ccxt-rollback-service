import { Ticker } from 'ccxt';

export interface ITicker extends Ticker {
  bidVolume?: number; // bidVolume is missing in ts-declaration due to its optional | undefined
}
