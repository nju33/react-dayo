import {QueueProps} from '../components/queue';

export interface DayoOptions {
  to: QueueProps['to'];
  position: QueueProps['position'];
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
