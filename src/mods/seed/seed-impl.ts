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

export interface SeedValues<BlockComponentAdditionalProps extends object>
  extends SeedFactoryValues<BlockComponentAdditionalProps> {
  id: string;
  cycle: Cycle;
}

export default interface SeedImpl<
  BlockComponentAdditionalProps extends object
> {
  Block: BlockComponent;
  values: SeedValues<BlockComponentAdditionalProps>;
  id: SeedValues<BlockComponentAdditionalProps>['id'];
  cycle: Cycle;
  theme: {
    transitionTimingFunction: NonNullable<
      SeedValues<BlockComponentAdditionalProps>['transitionTimingFunction']
    >;
  };
  message: NonNullable<SeedValues<BlockComponentAdditionalProps>['message']>;
  closed: boolean;
  wait(msec: number): Promise<void>;
  close(): void;
  [Symbol.asyncIterator](): AsyncIterator<
    SeedImpl<BlockComponentAdditionalProps>
  >;
}
