import {Position} from './constants/position';
import SeedImpl from './seed-impl';

export interface SeedData {
  name?: string;
  textColor: string;
  backgroundColor: string;
  transitionTimingFunction?: string;
  icon?: string;
  message?: string;
  position?: Position;
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
  position(value: NonNullable<SeedData['position']>): SeedFactoryImpl;
  createSeed(): SeedImpl;
}
