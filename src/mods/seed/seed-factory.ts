import nanoid from 'nanoid';
import {Position} from './constants/position';
import SeedFactoryImpl from './seed-impl';
import Seed from './seed';
import Cycle from '../cycle';

const defaults = {
  position: Position.CenterTop,
  textColor: '#fafafa',
  backgroundColor: '#292929',
  transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
};

export default class SeedFactory implements SeedFactoryImpl {
  private static memo = new Map<string, SeedFactoryImpl>();

  public static create(data: SeedFactoryImpl['data']): SeedFactoryImpl {
    const key = JSON.stringify(data);
    if (this.memo.has(key)) {
      return (this.memo.get(key) as unknown) as SeedFactoryImpl;
    }

    const seed = new SeedFactory(data);
    this.memo.set(key, seed);
    return seed;
  }

  public data: SeedFactoryImpl['data'];

  private constructor(data: SeedFactoryImpl['data']) {
    this.data = {
      ...defaults,
      ...data,
    };
  }

  public name(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.data, name: value});
  }

  public textColor(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.data, textColor: value});
  }

  public transitionTimingFunction(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.data, transitionTimingFunction: value});
  }

  public transitoin(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.data, transition: value});
  }

  public icon(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.data, icon: value});
  }

  public message(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.data, message: value});
  }

  public position(value: Position): SeedFactoryImpl {
    return SeedFactory.create({...this.data, position: value});
  }

  public createSeed(): Seed {
    return new Seed({
      id: nanoid(),
      cycle: new Cycle(),
      ...this.data,
    });
  }
}
