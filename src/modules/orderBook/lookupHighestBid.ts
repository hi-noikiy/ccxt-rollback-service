import { ITrade } from '../../types/trade';
import { IRollbackResponse } from '../../types/types';
import * as ccxt from "ccxt";
import { exchangeExists } from '../../util/exchangeExists';
import { Exchange, OrderBook } from 'ccxt';
import * as config from 'config';

export async function orderBookLookupHighestBid(payload: ITrade): Promise<null | IRollbackResponse> {
  if (!exchangeExists(payload.exchange)) {
    console.log('exchange does not exists!');
    return null;
    // @TODO throw custom error
  }

  const exchange: Exchange = new ccxt[payload.exchange]();
  const orderBook: OrderBook = await exchange.fetchOrderBook(payload.pair);

  const bid = orderBook.bids.filter(order => order[1] === payload.volume)[0];

  if (!bid) {
    console.log(`No possible bid found in order books against given trade ${JSON.stringify(payload)}!`);
    return null;
  }

  const loss: number = (payload.price - bid[0]) / payload.price;

  if (loss > config.get('app.maxLoss')) {
    console.log(`Detect loss of ${loss} with bid of ${bid[0]} against trade ${JSON.stringify(payload)} in order book!`);
    return null;
  }

  const rollback: IRollbackResponse = {
    rollback: {
      pair: payload.pair,
      exchange: payload.exchange,
      volume: bid[1],
      price: bid[0],
      direction: 'sell',
      loss: loss
    }
  };

  console.log(`found rollback in order book ${JSON.stringify(rollback)}`);

  return rollback;
}