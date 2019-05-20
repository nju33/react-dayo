import nanoid from 'nanoid';
import {Position} from './constants/position';
import SeedImpl from './seed-impl';
import Cycle from '../cycle';

export default class Seed implements SeedImpl {
  private static memo = new Map<string, SeedImpl>();

  public static create(data: SeedImpl['data']): SeedImpl {
    const key = JSON.stringify(data);
    if (this.memo.has(key)) {
      return (this.memo.get(key) as unknown) as SeedImpl;
    }

    const seed = new Seed(data);
    this.memo.set(key, seed);
    return seed;
  }

  public data: SeedImpl['data'];

  private constructor(data: SeedImpl['data']) {
    this.data = {
      id: nanoid(),
      position: Position.CenterTop,
      ...data,
    };
  }

  public icon(icon: string): this {
    this.data.icon = icon;
    return this;
  }

  public message(message: string): this {
    this.data.message = message;
    return this;
  }

  public position(position: Position): this {
    this.data.position = position;
    return this;
  }

  public [Symbol.asyncIterator] = async function*(
    this: Seed,
  ): AsyncIterator<object> {
    const id = nanoid();
    const cycle = new Cycle();

    yield {
      id,
      cycle,
      position: this.data.position,
    };

    await new Promise(
      (r): void => {
        requestAnimationFrame(r);
      },
    );

    cycle.proceed();
    yield {
      id,
      cycle,
      position: this.data.position,
    };

    cycle.proceed();
    yield {
      id,
      cycle,
      position: this.data.position,
    };

    cycle.proceed();
    yield {
      id,
      cycle,
      position: this.data.position,
    };
  }.bind(this);
}
