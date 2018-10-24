import { ITrade } from '../types/trade';
import { tickerLookupHighestBid } from '../modules/ticker/lookupHighestBid';
import { orderBookLookupHighestBid } from '../modules/orderBook/lookupHighestBid';
import { IRollbackResponse, RollbackResponse } from '../types/rollback';

export async function handleRollback(payload: ITrade): Promise<RollbackResponse> {
  let rollback: IRollbackResponse | null = await tickerLookupHighestBid(payload);

  if (rollback) {
    return rollback;
  }

  console.log('No rollback possible in ticker. Will lookup in orderBook.');

  rollback = await orderBookLookupHighestBid(payload);

  return rollback === null ? {} : rollback;
}
