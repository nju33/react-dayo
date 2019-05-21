import nanoid from 'nanoid';
import {Position} from './constants/position';
import SeedFactoryImpl from './seed-factory-impl';
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

  public static create(values: SeedFactoryImpl['values']): SeedFactoryImpl {
    const key = JSON.stringify(values);
    if (this.memo.has(key)) {
      return (this.memo.get(key) as unknown) as SeedFactoryImpl;
    }

    const seedFactory = new SeedFactory(values);
    this.memo.set(key, seedFactory);
    return seedFactory;
  }

  public values: SeedFactoryImpl['values'];

  private constructor(values: SeedFactoryImpl['values']) {
    this.values = {
      ...defaults,
      ...values,
    };
  }

  public name(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.values, name: value});
  }

  public textColor(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.values, textColor: value});
  }

  public backgroundColor(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.values, backgroundColor: value});
  }

  public transitionTimingFunction(value: string): SeedFactoryImpl {
    return SeedFactory.create({
      ...this.values,
      transitionTimingFunction: value,
    });
  }

  public icon(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.values, icon: value});
  }

  public message(value: string): SeedFactoryImpl {
    return SeedFactory.create({...this.values, message: value});
  }

  public closeButton(value: JSX.Element): SeedFactoryImpl {
    return SeedFactory.create({...this.values, closeButton: value});
  }

  public createSeed(): Seed {
    return new Seed({
      id: nanoid(),
      cycle: new Cycle(),
      ...this.values,
    });
  }
}
