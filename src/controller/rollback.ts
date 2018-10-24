import * as express from 'express';
import { Request, Response } from 'express';

export function registerResolveRollbackRoutes(app: express.Application): void {
  app.route('/v1/rollback').get((req: Request, res: Response) => {
    res.json({ status: 'UP' });
  });
}
