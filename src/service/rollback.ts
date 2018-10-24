import { ITrade } from '../types/trade';
import { tickerLookupHighestBid } from '../modules/ticker/lookupHighestBid';
import { IRollbackResponse } from '../types/types';

export async function handleRollback(payload: ITrade): Promise<IRollbackResponse> {
  const rollback: IRollbackResponse | null = await tickerLookupHighestBid(payload);

  if (rollback) {
    return rollback;
  }

  console.log('No rollback possible in ticker. Will lookup in orderBook.');

  

  return {
    rollback: {
      pair: 'BTC/EUR',
      exchange: 'kraken',
      volume: 1.0,
      price: 5400,
      direction: 'sell !!!!',
      loss: 0.03571428571
    }
  }
}
