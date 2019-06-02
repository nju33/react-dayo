// import {DispatcherImpl} from '../dispatcher';

export type DayoOptionTo = 'top' | 'bottom';

export interface DayoOptions {
  to: DayoOptionTo;
  maxLength: number;
}

export type DayoProps = DayoOptions;

export interface DayoStruct<T> {
  state: {
    queue: T[];
  };
  render(): JSX.Element;
}

export type IDayo<T> = DayoStruct<T>;
