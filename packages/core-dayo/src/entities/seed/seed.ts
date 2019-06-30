import nanoid from 'nanoid';
// import SeedBuilder, {ISeedBuilder, SeedBuilderValues} from '../seed-builder';
import SeedBuilder, {SeedBuilderValues} from '../seed-builder';
import Cycle from '../cycle';
import {ISeed, SeedValues, BlockComponent} from './interfaces';
import Interval, {IInterval} from '../interval';

export class Seed<
  BlockComponentProps extends object = {},
  BCP extends BlockComponentProps = BlockComponentProps
> implements ISeed<BCP> {
  public builder: () => SeedBuilder<BCP>;

  public values: SeedBuilderValues<BCP> | undefined;

  public readonly BlockComponent: BlockComponent | undefined;

  public readonly id = nanoid();

  public readonly cycle = new Cycle();

  public isCycleInEnterPhase() {
    return this.cycle.isEnterPhase();
  }

  public skipCycle() {
    return this.cycle.skip();
  }

  public closed = false;

  public constructor(
    BlockComponent: BlockComponent,
    userDefaultValues: Partial<SeedBuilderValues<BCP>> = {},
  ) {
    this.BlockComponent = BlockComponent;
    this.builder = () => {
      const builder = new SeedBuilder<BCP>(userDefaultValues);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      builder.from(this as any);
      return builder;
    };
  }

  public issue(values: SeedValues<BCP>): Seed<BCP> {
    return new Seed<BCP>(this.BlockComponent as BlockComponent, values);
  }

  public get theme(): {
    transitionTimingFunction: NonNullable<
      SeedValues<BCP>['transitionTimingFunction']
    >;
  } {
    const {transitionTimingFunction} = (this.values as unknown) as {
      transitionTimingFunction: string;
    };

    return {transitionTimingFunction};
  }

  public get message(): NonNullable<SeedValues<BCP>['message']> {
    if (this.values === undefined) {
      throw new Error('`message` and `timeout` is required');
    }

    const {message} = this.values;
    const name = this.values.name || 'Unknown';

    if (message === undefined) {
      throw new Error(`${name}'s message is undefind`);
    }

    return message;
  }

  public wait(msec: number): Promise<void> {
    return new Promise(
      (resolve): void => {
        setTimeout(resolve, msec);
      },
    );
  }

  private waitUntil(
    condition: () => boolean,
    interval: IInterval,
  ): Promise<void> {
    return interval.wait(this, onTick => {
      return new Promise(resolve => {
        onTick(() => {
          if (condition()) {
            resolve();
          }
        });
      });
    });
  }

  private waitUntilEntered(interval: IInterval): Promise<void> {
    return this.waitUntil(this.cycle.isEntered, interval);
  }

  private waitUntilExited(interval: IInterval): Promise<void> {
    return this.waitUntil(this.cycle.isExited, interval);
  }

  private waitUntilClick(interval: IInterval): Promise<void> {
    return this.waitUntil((): boolean => this.closed, interval);
  }

  private waitUntilSkipCycle(interval: IInterval): Promise<void> {
    return this.waitUntil(this.cycle.isSkip, interval);
  }

  public close = () => {
    this.closed = true;
  };

  public [Symbol.asyncIterator] = async function*(
    this: Seed<BCP>,
  ): AsyncIterator<ISeed<BCP>> {
    if (this.values === undefined) {
      throw new Error('`message` and `timeout` is required');
    }

    const interval = Interval.create();

    yield this; // after enter

    await Promise.race([this.wait(50), this.waitUntilSkipCycle(interval)]).then(
      this.cycle.proceed,
    );

    yield this; // after entering

    await Promise.race([this.waitUntilEntered(interval)]);

    yield this; // after entered

    await Promise.race([
      // this.wait(1000), // for debug
      // this.wait(500000000), // for debug
      this.values.timeout ? this.wait(this.values.timeout) : false,
      this.waitUntilClick(interval),
      this.waitUntilSkipCycle(interval),
    ].filter(Boolean) as Promise<unknown>[]).then(
      (): void => {
        this.cycle.proceed();
      },
    );

    yield this; // after exit

    await Promise.race([this.wait(50)]).then(this.cycle.proceed);

    yield this; // after exiting

    await Promise.race([this.waitUntilExited(interval)]);

    yield this; // after exited
  };
}

export default Seed;
