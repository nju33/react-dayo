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

export default class SeedFactory<
  BlockComponentAdditionalProps extends object = {}
> implements SeedFactoryImpl<BlockComponentAdditionalProps> {
  private static memo = new Map<
    string,
    {
      BlockComponent: BlockComponent | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      values: SeedFactoryImpl<any>['values'];
    }
  >();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static create<BlockComponentAdditionalProps extends object = {}>(
    values: SeedFactoryImpl<BlockComponentAdditionalProps>['values'],
    BlockComponent: BlockComponent | undefined = undefined,
  ): SeedFactoryImpl<BlockComponentAdditionalProps> {
    const key = JSON.stringify(values);
    if (this.memo.has(key)) {
      return (this.memo.get(key) as unknown) as SeedFactoryImpl<
        BlockComponentAdditionalProps
      >;
    }

    const seedFactory = new SeedFactory(values, BlockComponent);
    this.memo.set(key, seedFactory);

    return seedFactory;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  public BlockComponent: BlockComponent | undefined;

  public values: SeedFactoryImpl<BlockComponentAdditionalProps>['values'];

  private constructor(
    values: SeedFactoryImpl<BlockComponentAdditionalProps>['values'],
    BlockComponent: BlockComponent | undefined,
  ) {
    this.values = {
      ...defaults,
      ...values,
    };
    this.BlockComponent = BlockComponent;
  }

  public transitionTimingFunction(
    value: string,
  ): SeedFactoryImpl<BlockComponentAdditionalProps> {
    return SeedFactory.create<BlockComponentAdditionalProps>(
      {
        ...this.values,
        transitionTimingFunction: value,
      },
      this.BlockComponent,
    );
  }

  public message(
    value: string,
  ): SeedFactoryImpl<BlockComponentAdditionalProps> {
    return SeedFactory.create<BlockComponentAdditionalProps>(
      {...this.values, message: value},
      this.BlockComponent,
    );
  }

  public prop<Key extends keyof BlockComponentAdditionalProps>(
    key: Key,
    value: NonNullable<BlockComponentAdditionalProps[Key]>,
  ): SeedFactoryImpl<BlockComponentAdditionalProps> {
    return SeedFactory.create<BlockComponentAdditionalProps>(
      {
        ...this.values,
        props: ({
          ...this.values.props,
          [key]: value,
        } as unknown) as BlockComponentAdditionalProps,
      },
      this.BlockComponent,
    );
  }

  public props(
    values: BlockComponentAdditionalProps,
  ): SeedFactoryImpl<BlockComponentAdditionalProps> {
    return SeedFactory.create<BlockComponentAdditionalProps>(
      {
        ...this.values,
        props: ({
          ...this.values.props,
          ...values,
        } as unknown) as BlockComponentAdditionalProps,
      },
      this.BlockComponent,
    );
  }

  public createSeed(): SeedImpl<BlockComponentAdditionalProps> {
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
