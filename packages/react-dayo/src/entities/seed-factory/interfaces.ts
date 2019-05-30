import SeedImpl, {BlockComponent} from '../seed/seed-impl';

export interface SeedFactoryValues<
  BlockComponentAdditionalProps extends object
> {
  key: string;
  name: string;
  message: string;
  transitionTimingFunction: string;
  timeout: number | false;
  props: BlockComponentAdditionalProps;
}

export interface SeedFactoryStruct<
  BlockComponentAdditionalProps extends object,
  B extends BlockComponentAdditionalProps = BlockComponentAdditionalProps
> {
  BlockComponent: BlockComponent | undefined;
  values: Partial<SeedFactoryValues<B>>;
}

export interface SeedFactoryImpl<
  BlockComponentAdditionalProps extends object,
  B extends BlockComponentAdditionalProps = BlockComponentAdditionalProps
> {
  transitionTimingFunction(
    value: SeedFactoryValues<B>['transitionTimingFunction'],
  ): SeedFactoryImpl<B>;
  message(
    value: NonNullable<SeedFactoryValues<B>['message']>,
  ): SeedFactoryImpl<B>;
  timeout(
    value: NonNullable<SeedFactoryValues<B>['timeout']>,
  ): SeedFactoryImpl<B>;
  prop<Key extends keyof B>(
    key: Key,
    value: NonNullable<B[Key]>,
  ): SeedFactoryImpl<B>;
  props(values: B): SeedFactoryImpl<B>;
  createSeed(): SeedImpl<B>;
}

export default SeedFactoryImpl;
