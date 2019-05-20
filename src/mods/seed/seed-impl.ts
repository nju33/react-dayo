import {Position} from './constants/position';

export interface InstanceData {
  id: string;
  name: string;
  color: string;
  icon?: string;
  message?: string;
  position?: Position;
}

export default interface SeedImpl {
  data: InstanceData;
  icon(icon: string): this;
  message(message: string): this;
  position(position: Position): this;
  [Symbol.asyncIterator](): AsyncIterator<object>;
}
