
# ccxt-rollback-service

Spike Demo for lookup at [CCXT](https://github.com/ccxt/) ticker and order books api's to verify if a trade is reversible in any direction. 

## Prerequisites

* Node.js LTS 8.12.0 (best via [NVM](https://github.com/creationix/nvm))
* NPM 6.4.1

## Installing

`npm install`

## Getting Started 

After installing launch api by `npm run start` and check the examples below.

## Development

Run `npm run start:dev` or `npm run start:debug` to start hacking

## Build

`npm run build:prod`

## Tests

tbd

## Linting + Formatting

This repo use [Prettier](https://prettier.io/) and [TSLint+ESLint](https://github.com/buzinas/tslint-eslint-rules)

* `npm run lint`
* `npm run format`

## Examples

```
curl -X GET -H "Content-Type: application/json" --data '{"pair":"BTC/EUR","exchange":"kraken","volume":1.0,"price":5500,"direction":"buy"}' http://localhost:3000/v1/rollback/buy
```

```
curl -X GET -H "Content-Type: application/json" --data '{"pair":"BTC/EUR","exchange":"kraken","volume":1.0,"price":8000,"direction":"buy"}' http://localhost:3000/v1/rollback/buy
```
