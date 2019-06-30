import {SeedBuilderValues} from '../seed-builder';
import Cycle from '../cycle';

export interface BlockComponentProps {
  close(): void;
  children?: React.ReactNode;
}

export type BlockComponent =
  | React.ComponentClass<BlockComponentProps>
  | React.FunctionComponent<BlockComponentProps>
  | React.ExoticComponent<BlockComponentProps>;

export interface SeedValues<BlockComponentProps extends object = {}>
  extends SeedBuilderValues<BlockComponentProps> {
  id: string;
  cycle: Cycle;
}

export interface SeedStruct<
  BlockComponentAdditionalProps extends object = {},
  BCP extends BlockComponentAdditionalProps = BlockComponentAdditionalProps
> {
  BlockComponent: BlockComponent | undefined;
  id: string;
  cycle: Cycle;
  values: SeedBuilderValues<BCP> | undefined;
  theme: {
    transitionTimingFunction: NonNullable<
      SeedValues<BCP>['transitionTimingFunction']
    >;
  };
  message: NonNullable<SeedValues<BCP>['message']>;
  closed: boolean;
}

export interface SeedImpl<
  BlockComponentAdditionalProps extends object = {},
  BCP extends BlockComponentAdditionalProps = BlockComponentAdditionalProps
> {
  wait(msec: number): Promise<void>;
  close(): void;
  [Symbol.asyncIterator](): AsyncIterator<SeedImpl<BCP>>;
}

export type ISeed<
  BlockComponentAdditionalProps extends object = {},
  BCP extends BlockComponentAdditionalProps = BlockComponentAdditionalProps
> = SeedStruct<BCP> & SeedImpl<BCP>;
