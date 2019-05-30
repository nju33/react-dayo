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

export default interface SeedStruct<
  BlockComponentAdditionalProps extends object,
  B extends BlockComponentAdditionalProps = BlockComponentAdditionalProps
> {
  Block: BlockComponent;
  values: SeedValues<B>;
  id: SeedValues<B>['id'];
  cycle: Cycle;
  theme: {
    transitionTimingFunction: NonNullable<
      SeedValues<B>['transitionTimingFunction']
    >;
  };
  message: NonNullable<SeedValues<B>['message']>;
  closed: boolean;
}

export interface SeedImpl {
  wait(msec: number): Promise<void>;
  close(): void;
  [Symbol.asyncIterator](): AsyncIterator<SeedStruct<{}>>;
}
