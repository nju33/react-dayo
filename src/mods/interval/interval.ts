import NanoEvents from 'nanoevents';
import IntervalImpl from './interval-impl';

export class Interval<Item> implements IntervalImpl<Item> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static instance: Interval<any> | undefined;

  public static create<Item>(): Interval<Item> {
    if (this.instance === undefined) {
      this.instance = new Interval();
    }

    return this.instance;
  }

  private emitter = new NanoEvents<{tick: {}}>();

  private constructor() {}

  private items = new Map<Item, Item>();

  private intervalId: number | undefined;

  /**
   * just run with `window.setInterval`
   */
  private startTick(): void {
    this.intervalId = setInterval((): void => {
      this.emitter.emit('tick', {});
    }, 30);
  }

  private isRunningTick(): boolean {
    return this.intervalId !== undefined;
  }

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
  private has(item: Item): boolean {
    return this.items.has(item);
  }

  private add(item: Item): void {
    this.items.set(item, item);
  }

  private remove(item: Item): void {
    this.items.delete(item);
  }

  public async wait(
    item: Item,
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
