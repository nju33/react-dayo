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

  public wait(msec: number): Promise<void> {
    return new Promise(
      (resolve): void => {
        setTimeout(resolve, msec);
      },
    );
  }

  public [Symbol.asyncIterator] = async function*(
    this: SeedImpl,
  ): AsyncIterator<SeedImpl> {
    yield this; // after enter

    await this.wait(50).then(this.cycle.proceed);

    yield this; // after entering

    await this.cycle.waitUntilEntered(60000);

    yield this; // after entered

    await this.wait(5000).then(this.cycle.proceed);
    // await this.wait(500000000); // for debug

    yield this; // after exit

    await this.wait(50).then(this.cycle.proceed);

    yield this; // after exiting

    await this.cycle.waitUntilExited(60000);

    yield this; // after exited
  };
}

export default Seed;
