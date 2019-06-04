import NanoEvents from 'nanoevents';
import {IInterval} from './interfaces';

/**
 * Value Object
 */
export class Interval implements IInterval {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static instance: Interval | undefined;

  public static create(): Interval {
    if (this.instance === undefined) {
      this.instance = new Interval();
    }

    return this.instance;
  }

  private emitter = new NanoEvents<{tick: {}}>();

  private constructor() {}

  private items = new Map<unknown, unknown>();

  private intervalId: number | undefined;

  /**
   * just run with `window.setInterval`
   */
  private startTick() {
    this.intervalId = window.setInterval((): void => {
      this.emitter.emit('tick', {});
    }, 30);
  }

  /**
   * Weather running `window.setInterval`
   */
  private isRunningTick(): boolean {
    return this.intervalId !== undefined;
  }

  /**
   * To stop running `window.setInterval`
   */
  private stopTick(): void {
    if (!this.isRunningTick()) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  private hasItems(): boolean {
    return this.items.size > 0;
  }

  /**
   * whether item has
   */
  private has(item: unknown) {
    return this.items.has(item);
  }

  private add(item: unknown) {
    this.items.set(item, item);
  }

  private remove(item: unknown) {
    this.items.delete(item);
  }

  public async wait(
    item: unknown,
    condition: (onTick: (cb: () => void) => void) => Promise<void>,
  ): Promise<void> {
    this.add(item);

    if (this.has(item) && this.hasItems() && !this.isRunningTick()) {
      this.startTick();
    }

    const onTick = this.emitter.on.bind(this.emitter, 'tick');
    await condition(onTick);

    this.remove(item);

    if (!this.has(item) && !this.hasItems() && this.isRunningTick()) {
      this.stopTick();
    }
  }
}

export default Interval;
