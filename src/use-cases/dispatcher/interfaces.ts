import {Event} from './constants/events';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DispatcherEventFn = (...args: any[]) => void;

export interface DispatcherImpl {
  dispatch(f: unknown): () => Promise<void>;
  /**
   * To call registered callback of the event
   */
  emit(event: Event, t: unknown): void;
  /**
   * To register callback of the event
   */
  on(event: Event, cb: DispatcherEventFn): void;
}

export default DispatcherImpl;
