import { ITrade } from './trade';

export interface IRollbackResponse {
  rollback: any;
}

interface IRollback extends ITrade {
  loss: number;
}