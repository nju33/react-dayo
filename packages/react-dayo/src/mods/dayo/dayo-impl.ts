import {DispatcherImpl} from '../dispatcher';

export type DayoOptionTo = 'top' | 'bottom';

export interface DayoOptions {
  to: DayoOptionTo;
  maxLength: number;
}

export interface DayoImpl<F, T> {
  dispatcher: DispatcherImpl<F, T>;
  state: {
    queue: T[];
  };
  render(): JSX.Element;
}

export default DayoImpl;
