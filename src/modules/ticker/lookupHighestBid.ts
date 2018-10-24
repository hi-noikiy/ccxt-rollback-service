import { ITrade } from '../../types/trade';
import *  as ccxt from 'ccxt'
import { Exchange } from 'ccxt';
import { ITicker } from '../../types/ticker';
import * as config from 'config';
import { IRollbackResponse } from '../../types/types';

export async function tickerLookupHighestBid(payload: ITrade): Promise<null | IRollbackResponse> {
  if (!ccxt.exchanges.includes(payload.exchange)) {
    console.log('exchange does not exists!');
    return null;
    // @TODO throw custom error
  }

  const exchange: Exchange = new ccxt[payload.exchange]();
  const tickerData: ITicker = await exchange.fetchTicker(payload.pair);
  const loss: number = (payload.price - tickerData.bid) / payload.price;

  if (loss > config.get('app.maxLoss')) {
    console.log(`Detect loss of ${loss} with bid of ${tickerData.bid} against trade ${payload.price} in ticker!`);
    return null;
  }

  if (!tickerData.bidVolume || (tickerData.bidVolume < payload.volume)) {
    console.log(`found ticker bid with volume ${tickerData.bidVolume} is lower then trade volume ${payload.volume} or its undefined`);
    return null;
  }

  const rollback: IRollbackResponse = {
    rollback: {
      pair: tickerData.symbol,
      exchange: payload.exchange,
      volume: tickerData.bidVolume,
      price: tickerData.bid,
      direction: 'sell',
      loss: loss
    }
  };

  console.log(`found rollback ${JSON.stringify(rollback)}`);

  return rollback;
}
