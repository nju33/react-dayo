import {Event} from './constants/events';

export interface DispatcherImpl<F, T> {
  dispatch(f: F): () => Promise<void>;
  emit(event: Event, t: T): void;
  on(event: Event, cb: (t: T) => void): void;
}

export default DispatcherImpl;
