import {SeedFactoryValue} from './seed-factory-impl';
import Cycle from '../cycle';

export interface SeedValues extends SeedFactoryValue {
  id: string;
  cycle: Cycle;
}

export default interface SeedImpl {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  values: SeedValues;
  id: SeedValues['id'];
  cycle: Cycle;
  theme: {
    textColor: NonNullable<SeedValues['textColor']>;
    backgroundColor: NonNullable<SeedValues['backgroundColor']>;
    transitionTimingFunction: NonNullable<
      SeedValues['transitionTimingFunction']
    >;
  };
  message: NonNullable<SeedValues['message']>;
  wait(msec: number): Promise<void>;
  [Symbol.asyncIterator](): AsyncIterator<SeedImpl>;
}
