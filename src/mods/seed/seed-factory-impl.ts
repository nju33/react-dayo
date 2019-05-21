import SeedImpl from './seed-impl';

export interface SeedData {
  name?: string;
  textColor: string;
  backgroundColor: string;
  transitionTimingFunction?: string;
  icon?: string;
  message?: string;
}

export default interface SeedFactoryImpl {
  data: SeedData;
  name(value: SeedData['name']): SeedFactoryImpl;
  textColor(value: SeedData['textColor']): SeedFactoryImpl;
  backgroundColor(value: SeedData['backgroundColor']): SeedFactoryImpl;
  transitionTimingFunction(
    value: SeedData['transitionTimingFunction'],
  ): SeedFactoryImpl;
  icon(value: NonNullable<SeedData['icon']>): SeedFactoryImpl;
  message(value: NonNullable<SeedData['message']>): SeedFactoryImpl;
  createSeed(): SeedImpl;
}
