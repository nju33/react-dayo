import React from 'react';
import SeedImpl, {SeedValues, BlockComponent} from './seed-impl';
import Interval, {IntervalImpl} from '../interval';

export class Seed<BlockComponentAdditionalProps extends object = {}>
  implements SeedImpl<BlockComponentAdditionalProps> {
  public values: SeedValues<BlockComponentAdditionalProps>;

  public Block: BlockComponent;

  public closed = false;

  public constructor(
    values: SeedValues<BlockComponentAdditionalProps>,
    Block: BlockComponent = React.Fragment,
  ) {
    this.values = values;
    this.Block = Block;
  }

  public get id(): SeedValues<BlockComponentAdditionalProps>['id'] {
    return this.values.id;
  }

  public get cycle(): SeedValues<BlockComponentAdditionalProps>['cycle'] {
    return this.values.cycle;
  }

  public get theme(): {
    transitionTimingFunction: NonNullable<
      SeedValues<BlockComponentAdditionalProps>['transitionTimingFunction']
    >;
  } {
    const {transitionTimingFunction} = (this.values as unknown) as {
      transitionTimingFunction: string;
    };

    return {transitionTimingFunction};
  }

  public get message(): NonNullable<
    SeedValues<BlockComponentAdditionalProps>['message']
  > {
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
    interval: IntervalImpl<SeedImpl<BlockComponentAdditionalProps>>,
  ): Promise<void> {
    return interval.wait(
      this,
      (onTick): Promise<void> => {
        return new Promise(
          (resolve): void => {
            onTick(
              (): void => {
                if (condition()) {
                  resolve();
                }
              },
            );
          },
        );
      },
    );
  }

  private waitUntilEntered(
    interval: IntervalImpl<SeedImpl<BlockComponentAdditionalProps>>,
  ): Promise<void> {
    return this.waitUntil(this.cycle.isEntered, interval);
  }

  private waitUntilExited(
    interval: IntervalImpl<SeedImpl<BlockComponentAdditionalProps>>,
  ): Promise<void> {
    return this.waitUntil(this.cycle.isExited, interval);
  }

  private waitUntilClick(
    interval: IntervalImpl<SeedImpl<BlockComponentAdditionalProps>>,
  ): Promise<void> {
    return this.waitUntil((): boolean => this.closed, interval);
  }

  public close = (): void => {
    this.closed = true;
  };

  public [Symbol.asyncIterator] = async function*(
    this: Seed<BlockComponentAdditionalProps>,
  ): AsyncIterator<SeedImpl<BlockComponentAdditionalProps>> {
    const interval = Interval.create<SeedImpl<BlockComponentAdditionalProps>>();

    yield this; // after enter

    await this.wait(50).then(this.cycle.proceed);

    yield this; // after entering

    await this.waitUntilEntered(interval);

    yield this; // after entered

    await Promise.race(
      [
        // this.wait(5000),
        // this.wait(1000), // for debug
        this.wait(500000000), // for debug
        this.waitUntilClick(interval),
      ].filter(Boolean),
    ).then(this.cycle.proceed);

    yield this; // after exit

    await this.wait(50).then(this.cycle.proceed);

    yield this; // after exiting

    await this.waitUntilExited(interval);

    yield this; // after exited
  };
}

export default Seed;
