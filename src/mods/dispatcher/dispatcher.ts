import DispatcherImpl from './dispatcher-impl';
import {Event as DispatcherEvent} from './constants/events';
import {SeedFactoryImpl, SeedImpl} from '../seed';

/**
 * Dispatcher for Seed
 */
export class Dispatcher implements DispatcherImpl<SeedFactoryImpl, SeedImpl> {
  private events = new Map<
    DispatcherEvent,
    ((seedOnCycle: SeedImpl) => void)[]
  >();

  public dispatch = (
    seedFactory: SeedFactoryImpl,
  ): (() => Promise<void>) => async (): Promise<void> => {
    console.log(9999);
    const seed = seedFactory.createSeed();
    console.log(9999);
    try {
      for await (const seedOnCycle of seed) {
        console.log(9999);
        this.emit(DispatcherEvent.UpdateSeed, seedOnCycle);
      }
    } catch (err) {
      console.log(err);
    }

    console.log(9999);

    this.emit(DispatcherEvent.DoneSeed, seed);
  };

  public emit(event: DispatcherEvent, seedOnCycle: SeedImpl): void {
    const callbacks = this.events.get(event);
    if (callbacks === undefined) {
      return;
    }

    callbacks.forEach(
      (callback): void => {
        callback(seedOnCycle);
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public on(event: DispatcherEvent, cb: (seedOnCycle: SeedImpl) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, [cb]);
      return;
    }

    const callbacks = this.events.get(event);
    if (callbacks === undefined) {
      throw new Error('strangely the `callbacks` is undefined');
    }

    callbacks.push(cb);

    this.events.set(event, callbacks);
  }
}

export default Dispatcher;
