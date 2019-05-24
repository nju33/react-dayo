import SeedImpl, {BlockComponent} from './seed-impl';

export interface SeedFactoryValues<
  BlockComponentAdditionalProps extends object
> {
  key?: string;
  name?: string;
  message?: string;
  transitionTimingFunction?: string;
  props?: BlockComponentAdditionalProps;
}

export interface SeedFactoryImpl<BlockComponentAdditionalProps extends object> {
  BlockComponent: BlockComponent | undefined;
  values: SeedFactoryValues<BlockComponentAdditionalProps>;
  transitionTimingFunction(
    value: SeedFactoryValues<
      BlockComponentAdditionalProps
    >['transitionTimingFunction'],
  ): SeedFactoryImpl<BlockComponentAdditionalProps>;
  message(
    value: NonNullable<
      SeedFactoryValues<BlockComponentAdditionalProps>['message']
    >,
  ): SeedFactoryImpl<BlockComponentAdditionalProps>;
  prop<Key extends keyof BlockComponentAdditionalProps>(
    key: Key,
    value: NonNullable<BlockComponentAdditionalProps[Key]>,
  ): SeedFactoryImpl<BlockComponentAdditionalProps>;
  props(
    values: BlockComponentAdditionalProps,
  ): SeedFactoryImpl<BlockComponentAdditionalProps>;
  createSeed(): SeedImpl<BlockComponentAdditionalProps>;
}

export default SeedFactoryImpl;
