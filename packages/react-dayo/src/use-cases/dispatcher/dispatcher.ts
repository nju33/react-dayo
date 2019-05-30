import DispatcherImpl from './interfaces';
import {Event} from './constants/events';
import {SeedFactoryImpl, SeedImpl} from '../../mods/seed';

/**
 * Dispatcher Use Case
 */
export class Dispatcher<BlockComponentAdditionalProps extends object = {}>
  implements
    DispatcherImpl<
      SeedFactoryImpl<BlockComponentAdditionalProps>,
      SeedImpl<BlockComponentAdditionalProps>
    > {
  private events = new Map<
    Event,
    ((seedOnCycle: SeedImpl<BlockComponentAdditionalProps>) => void)[]
  >();

  public dispatch = (
    seedFactory: SeedFactoryImpl<BlockComponentAdditionalProps>,
  ): (() => Promise<void>) => async (): Promise<void> => {
    const seed = seedFactory.createSeed();

    for await (const seedOnCycle of seed) {
      this.emit(Event.UpdateSeed, seedOnCycle);
    }

    this.emit(Event.DoneSeed, seed);
  };

  public emit(
    event: Event,
    seedOnCycle: SeedImpl<BlockComponentAdditionalProps>,
  ): void {
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
  public on(
    event: Event,
    cb: (seedOnCycle: SeedImpl<BlockComponentAdditionalProps>) => void,
  ): void {
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
