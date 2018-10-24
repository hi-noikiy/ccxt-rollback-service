import * as express from 'express';
import * as config from 'config';
import * as bodyParser from 'body-parser';
import { registerResolveRollbackRoutes } from './controller/rollback';

export class ApiServer {
  private app: express.Application = express();
  private port: number = config.get('api.port');

  public start() {
    this.init()
      .then(() => {
        this.app.listen(this.port);
        console.log(`api initialized successfully on port ${this.port}`)
      })
      .catch((err) => console.log(`start api failed ${err}`));
  }

  private async init(): Promise<void> {
    this.app.use(bodyParser.json());
    this.initRoutes();
  }

  private initRoutes() {
    registerResolveRollbackRoutes(this.app);
  }
}