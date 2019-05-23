import SeedImpl, {BlockComponent} from './seed-impl';

export interface SeedFactoryValues {
  key?: string;
  name?: string;
  message?: string;
  transitionTimingFunction?: string;
}

export default interface SeedFactoryImpl {
  BlockComponent: BlockComponent | undefined;
  values: SeedFactoryValues;
  transitionTimingFunction(
    value: SeedFactoryValues['transitionTimingFunction'],
  ): SeedFactoryImpl;
  message(value: NonNullable<SeedFactoryValues['message']>): SeedFactoryImpl;
  createSeed(): SeedImpl;
}
