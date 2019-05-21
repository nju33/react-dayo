import SeedImpl from './seed-impl';

export interface SeedFactoryValue {
  name?: string;
  textColor: string;
  backgroundColor: string;
  transitionTimingFunction?: string;
  icon?: string;
  message?: string;
}

export default interface SeedFactoryImpl {
  values: SeedFactoryValue;
  name(value: SeedFactoryValue['name']): SeedFactoryImpl;
  textColor(value: SeedFactoryValue['textColor']): SeedFactoryImpl;
  backgroundColor(value: SeedFactoryValue['backgroundColor']): SeedFactoryImpl;
  transitionTimingFunction(
    value: SeedFactoryValue['transitionTimingFunction'],
  ): SeedFactoryImpl;
  icon(value: NonNullable<SeedFactoryValue['icon']>): SeedFactoryImpl;
  message(value: NonNullable<SeedFactoryValue['message']>): SeedFactoryImpl;
  createSeed(): SeedImpl;
}
