import {Position} from './constants/position';
import {ISeedBuilder, SeedBuilderStruct} from './interfaces';

const defaults = {
  position: Position.CenterTop,
  transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
};

export class SeedBuilder<
  BlockComponentProps extends object = {},
  BCP extends BlockComponentProps = BlockComponentProps
> implements ISeedBuilder<BCP> {
  public values!: SeedBuilderStruct<BCP>['values'];

  // public BlockComponent: BlockComponent | undefined;

  private memo = new Map<string, SeedBuilder<BCP>>();

  public seed!: AsyncIterable<unknown>;

  public constructor(values: SeedBuilderStruct<BCP>['values'] = {}) {
    this.values = {...defaults, ...values};
  }

  // private getMemoKey(values: SeedBuilderStruct<BCP>['values']): string {
  //   return JSON.stringify(values);
  // }

  public from(seed: AsyncIterable<unknown>) {
    this.seed = seed;
  }

  // public assign(values: SeedBuilderStruct<BCP>['values']): SeedBuilder<BCP> {
  //   const key = this.getMemoKey(values);
  //   const value = this.memo.get(key);
  //   if (value !== undefined) {
  //     return value;
  //   }

  //   const seedBuilder = new SeedBuilder<BCP>(BlockComponent, values);
  //   seedBuilder.from(this.seed);
  //   this.memo.set(key, seedBuilder);

  //   return seedBuilder;
  // }

  public transitionTimingFunction(
    this: ISeedBuilder<BCP>,
    value: string,
  ): ISeedBuilder<BCP> {
    this.values = {
      ...this.values,
      transitionTimingFunction: value,
    };

    return this;
  }

  public message(this: ISeedBuilder<BCP>, value: string): ISeedBuilder<BCP> {
    this.values = {...this.values, message: value};

    return this;
  }

  public timeout(
    this: ISeedBuilder<BCP>,
    value: NonNullable<SeedBuilderStruct<BCP>['values']['timeout']>,
  ): ISeedBuilder<BCP> {
    this.values = {...this.values, timeout: value};

    return this;
  }

  public prop<Key extends keyof BCP>(
    this: ISeedBuilder<BCP>,
    key: Key,
    value: NonNullable<BCP[Key]>,
  ): ISeedBuilder<BCP> {
    /* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
    this.values = {
      ...this.values,
      props: {
        ...this.values.props,
        [key]: value,
      } as BCP,
    };
    /* eslint-enable @typescript-eslint/no-object-literal-type-assertion */
    return this;
  }

  public props(this: ISeedBuilder<BCP>, values: BCP): ISeedBuilder<BCP> {
    this.values = {
      ...this.values,
      props: {
        ...this.values.props,
        ...values,
      },
    };

    return this;
  }
}

export default SeedBuilder;
