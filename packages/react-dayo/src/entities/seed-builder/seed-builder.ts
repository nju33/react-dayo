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

  public seed!: {
    issue(): AsyncIterable<unknown> & {
      values: SeedBuilderStruct<BCP>['values'];
    };
  };

  public constructor(values: SeedBuilderStruct<BCP>['values'] = {}) {
    this.values = {...defaults, ...values};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public from(seed: {
    issue(): AsyncIterable<unknown> & {
      values: SeedBuilderStruct<BCP>['values'];
    };
  }) {
    this.seed = seed;
  }

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

  public message(
    this: ISeedBuilder<BCP>,
    value: string | JSX.Element,
  ): ISeedBuilder<BCP> {
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
