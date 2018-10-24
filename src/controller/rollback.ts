import * as express from 'express';
import { Request, Response } from 'express';
import { ITrade } from '../types/trade';
import { handleRollback } from '../service/rollback';
import { IRollbackResponse } from '../types/types';

export function registerResolveRollbackRoutes(app: express.Application): void {
  app.route('/v1/rollback').get(async (req: Request, res: Response) => {
    try {
      const result: IRollbackResponse = await handleRollback(requestHandler(req));
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

function responseHandler(res: Response, data: IRollbackResponse) {
  try {
    res.status(200);
    res.json(data);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
}