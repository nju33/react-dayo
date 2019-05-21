import SeedImpl, {SeedValues} from './seed-impl';

export class Seed implements SeedImpl {
  public values: SeedValues;

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
    const {textColor, backgroundColor, transitionTimingFunction} = this.values;

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

  private wait(msec: number): Promise<void> {
    return new Promise(
      (resolve): void => {
        setTimeout(resolve, msec);
      },
    );
  }

  public [Symbol.asyncIterator] = async function*(
    this: SeedImpl,
  ): AsyncIterator<SeedImpl> {
    // after enter
    yield this;

    await this.wait(50);
    this.cycle.proceed();

    // after entering
    yield this;

    await this.cycle.waitUntilEntered(60000);

    // after entered
    yield this;

    // await this.wait(5000);
    await this.wait(500000000);
    this.cycle.proceed();

    // after exit
    yield this;

    await this.wait(50);
    this.cycle.proceed();

    // after exiting
    yield this;

    await this.cycle.waitUntilExited();

    // after exited
    yield this;
  };
}

export default Seed;
