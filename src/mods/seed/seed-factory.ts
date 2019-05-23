import nanoid from 'nanoid';
import {Position} from './constants/position';
import SeedFactoryImpl from './seed-factory-impl';
import SeedImpl, {BlockComponent} from './seed-impl';
import Seed from './seed';
import Cycle from '../cycle';

const defaults = {
  position: Position.CenterTop,
  transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
};

export default class SeedFactory implements SeedFactoryImpl {
  private static memo = new Map<
    string,
    {
      BlockComponent: BlockComponent | undefined;
      values: SeedFactoryImpl['values'];
    }
  >();

  public static create(
    values: SeedFactoryImpl['values'],
    BlockComponent: BlockComponent | undefined = undefined,
  ): SeedFactoryImpl {
    const key = JSON.stringify(values);
    if (this.memo.has(key)) {
      return (this.memo.get(key) as unknown) as SeedFactoryImpl;
    }

    const seedFactory = new SeedFactory(values, BlockComponent);
    this.memo.set(key, seedFactory);

    return seedFactory;
  }

  public BlockComponent: BlockComponent | undefined;

  public values: SeedFactoryImpl['values'];

  private constructor(
    values: SeedFactoryImpl['values'],
    BlockComponent: BlockComponent | undefined,
  ) {
    this.values = {
      ...defaults,
      ...values,
    };
    this.BlockComponent = BlockComponent;
  }

  public transitionTimingFunction(value: string): SeedFactoryImpl {
    return SeedFactory.create(
      {
        ...this.values,
        transitionTimingFunction: value,
      },
      this.BlockComponent,
    );
  }

  public message(value: string): SeedFactoryImpl {
    return SeedFactory.create(
      {...this.values, message: value},
      this.BlockComponent,
    );
  }

  public createSeed(): SeedImpl {
    return new Seed(
      {
        id: nanoid(),
        cycle: new Cycle(),
        ...this.values,
      },
      this.BlockComponent,
    );
  }
}
