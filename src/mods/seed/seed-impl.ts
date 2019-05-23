import {SeedFactoryValues} from './seed-factory-impl';
import Cycle from '../cycle';

export interface BlockComponentProps {
  close(): void;
  children?: React.ReactNode;
}

export type BlockComponent =
  | React.ComponentClass<BlockComponentProps>
  | React.FunctionComponent<BlockComponentProps>
  | React.ExoticComponent<BlockComponentProps>;

export interface SeedValues extends SeedFactoryValues {
  id: string;
  cycle: Cycle;
}

export default interface SeedImpl {
  Block: BlockComponent;
  values: SeedValues;
  id: SeedValues['id'];
  cycle: Cycle;
  theme: {
    transitionTimingFunction: NonNullable<
      SeedValues['transitionTimingFunction']
    >;
  };
  message: NonNullable<SeedValues['message']>;
  closed: boolean;
  wait(msec: number): Promise<void>;
  close(): void;
  [Symbol.asyncIterator](): AsyncIterator<SeedImpl>;
}
