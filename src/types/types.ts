import { ITrade } from './trade';

export type RollbackResponse = IRollbackResponse | {};

export interface IRollbackResponse {
  rollback: IRollback;
}

interface IRollback extends ITrade {
  loss: number;
}