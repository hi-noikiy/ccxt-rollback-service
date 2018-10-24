import * as express from 'express';
import { Request, Response } from 'express';
import { ITrade } from '../types/trade';
import { handleRollback } from '../service/rollback';
import { RollbackResponse } from '../types/types';

export function registerResolveRollbackRoutes(app: express.Application): void {
  app.route('/v1/rollback/buy').get(async (req: Request, res: Response) => {
    try {
      const result: RollbackResponse = await handleRollback(requestHandler(req));
      responseHandler(res, result);
    } catch (err) {
      res.status(404);
      res.json(err);
    }
  });
}

function requestHandler(req: Request): ITrade {
  return req.body;
}

function responseHandler(res: Response, data: RollbackResponse) {
  try {
    res.status(200);
    res.json(data);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
}