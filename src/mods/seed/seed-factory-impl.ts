import SeedImpl from './seed-impl';

export interface SeedFactoryValues {
  name?: string;
  textColor: string;
  backgroundColor: string;
  transitionTimingFunction?: string;
  icon?: string;
  message?: string;
  closeButton?: JSX.Element;
}

export default interface SeedFactoryImpl {
  values: SeedFactoryValues;
  name(value: SeedFactoryValues['name']): SeedFactoryImpl;
  textColor(value: SeedFactoryValues['textColor']): SeedFactoryImpl;
  backgroundColor(value: SeedFactoryValues['backgroundColor']): SeedFactoryImpl;
  transitionTimingFunction(
    value: SeedFactoryValues['transitionTimingFunction'],
  ): SeedFactoryImpl;
  icon(value: NonNullable<SeedFactoryValues['icon']>): SeedFactoryImpl;
  message(value: NonNullable<SeedFactoryValues['message']>): SeedFactoryImpl;
  closeButton(
    value: NonNullable<SeedFactoryValues['closeButton']>,
  ): SeedFactoryImpl;
  createSeed(): SeedImpl;
}
