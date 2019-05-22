import SeedImpl, {SeedValues} from './seed-impl';
import Interval, {IntervalImpl} from '../interval';

export class Seed implements SeedImpl {
  public values: SeedValues;

  public closeButtonClicked = false;

  public constructor(values: SeedValues) {
    this.values = values;
  }

  public get id(): SeedValues['id'] {
    return this.values.id;
  }

  public get cycle(): SeedValues['cycle'] {
    return this.values.cycle;
  }

  public get theme(): {
    textColor: NonNullable<SeedValues['textColor']>;
    backgroundColor: NonNullable<SeedValues['backgroundColor']>;
    transitionTimingFunction: NonNullable<
      SeedValues['transitionTimingFunction']
    >;
  } {
    const {textColor, backgroundColor, transitionTimingFunction} = (this
      .values as unknown) as {
      textColor: string;
      backgroundColor: string;
      transitionTimingFunction: string;
    };

    return {textColor, backgroundColor, transitionTimingFunction};
  }

  public get message(): NonNullable<SeedValues['message']> {
    const {message} = this.values;
    const name = this.values.name || 'Unknown';

    if (message === undefined) {
      throw new Error(`${name}'s message is undefind`);
    }

    return message;
  }

  public get closeButton(): SeedValues['closeButton'] {
    const {closeButton} = this.values;

    return closeButton;
  }

  public setCloseButtonClicked(): void {
    this.closeButtonClicked = true;
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
    interval: IntervalImpl<SeedImpl>,
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

  private waitUntilEntered(interval: IntervalImpl<SeedImpl>): Promise<void> {
    return this.waitUntil(this.cycle.isEntered, interval);
  }

  private waitUntilExited(interval: IntervalImpl<SeedImpl>): Promise<void> {
    return this.waitUntil(this.cycle.isExited, interval);
  }

  private waitUntilClick(interval: IntervalImpl<SeedImpl>): Promise<void> {
    return this.waitUntil((): boolean => this.closeButtonClicked, interval);
  }

  public [Symbol.asyncIterator] = async function*(
    this: Seed,
  ): AsyncIterator<SeedImpl> {
    const interval = Interval.create<SeedImpl>();

    yield this; // after enter

    await this.wait(50).then(this.cycle.proceed);

    yield this; // after entering

    await this.waitUntilEntered(interval);

    yield this; // after entered

    // await Promise.race(
    //   [this.wait(5000), this.waitUntilClick(interval)].filter(Boolean),
    // ).then(this.cycle.proceed);
    // await this.wait(1000).then(this.cycle.proceed); // for debug
    await this.wait(500000000); // for debug

    yield this; // after exit

    await this.wait(50).then(this.cycle.proceed);

    yield this; // after exiting

    await this.waitUntilExited(interval);

    yield this; // after exited
  };
}

export default Seed;
