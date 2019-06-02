// import {BlockComponent} from '../seed';

export interface BlockComponentProps {
  close(): void;
  children?: React.ReactNode;
}

export type BlockComponent =
  | React.ComponentClass<BlockComponentProps>
  | React.FunctionComponent<BlockComponentProps>
  | React.ExoticComponent<BlockComponentProps>;

export interface SeedBuilderValues<BlockComponentProps extends object> {
  key: string;
  name: string;
  message: string;
  transitionTimingFunction: string;
  timeout: number | false;
  props: BlockComponentProps;
}

export type ISeedBuilder<
  BlockComponentProps extends object = {},
  B extends BlockComponentProps = BlockComponentProps
> = SeedBuilderStruct<B> & SeedBuilderImpl<B>;

export interface SeedBuilderStruct<
  BlockComponentProps extends object = {},
  B extends BlockComponentProps = BlockComponentProps
> {
  // BlockComponent: BlockComponent | undefined;
  values: Partial<SeedBuilderValues<B>>;
  seed: AsyncIterable<unknown>;
}

export interface SeedBuilderImpl<
  BlockComponentAdditionalProps extends object = {},
  B extends BlockComponentAdditionalProps = BlockComponentAdditionalProps
> {
  transitionTimingFunction(
    value: SeedBuilderValues<B>['transitionTimingFunction'],
  ): ISeedBuilder<B>;
  message(value: NonNullable<SeedBuilderValues<B>['message']>): ISeedBuilder<B>;
  timeout(value: NonNullable<SeedBuilderValues<B>['timeout']>): ISeedBuilder<B>;
  prop<Key extends keyof B>(
    key: Key,
    value: NonNullable<B[Key]>,
  ): ISeedBuilder<B>;
  props(values: B): ISeedBuilder<B>;
}
