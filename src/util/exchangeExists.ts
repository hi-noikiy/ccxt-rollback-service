import * as ccxt from "ccxt";

export function exchangeExists(exchange: string): boolean {
  return ccxt.exchanges.includes(exchange);
}