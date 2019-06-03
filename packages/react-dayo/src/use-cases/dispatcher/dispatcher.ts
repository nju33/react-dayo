import {DispatcherImpl, DispatcherEventFn} from './interfaces';
import {Event} from './constants/events';

/**
 * Dispatcher Use Case for seed
 */
export class Dispatcher implements DispatcherImpl {
  private events = new Map<Event, DispatcherEventFn[]>();

  /**
   * To turn AsyncIterable that obtained form the factory.
   */
  public dispatch = (builder: {
    seed: {issue(): AsyncIterable<unknown> & {values: any}}; // eslint-disable-line @typescript-eslint/no-explicit-any
    values: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }): (() => Promise<void>) => async (): Promise<void> => {
    const {seed, values} = builder;
    const issued = seed.issue();
    issued.values = values;

    for await (const yielded of issued) {
      this.emit(Event.UpdateSeed, yielded);
    }

    this.emit(Event.DoneSeed, issued);
  };

  /**
   * To fire callback function for the event that is registered
   */
  public emit(event: Event, yielded: unknown): void {
    const callbacks = this.events.get(event) || [];

    callbacks.forEach(callback => {
      callback(yielded);
    });
  }

  /**
   * To register callback function for the event
   */
  public on(event: Event, cb: DispatcherEventFn): void {
    if (!this.events.has(event)) {
      this.events.set(event, [cb]);
      return;
    }

    const callbacks = this.events.get(event);
    if (callbacks === undefined) {
      throw new Error('strangely the `callbacks` is undefined');
    }

    this.events.set(event, [...callbacks, cb]);
  }
}

export default Dispatcher;
