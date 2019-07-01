import {BlockComponent, ISeed} from '../entities/seed';

export interface DayoOptions {
  to: 'top' | 'bottom';
  position: 'left' | 'center' | 'right';
  maxLength: number;
}

export type DayoProps = DayoOptions;

export interface DayoImpl<Seed> {
  getOption<Key extends keyof DayoProps>(key: Key): DayoProps[Key];
  getQueue(): Seed[];
  setQueue(queue: Seed[]): void;
  onTransitionEnd(seed: Seed): () => void;
}

export type IDayo<Seed> = DayoImpl<Seed>;

export interface DayoState<Seed> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queue: Seed[];
}

export interface DayoOperatorImpl<Seed> {
  /**
   * Update target seed state for running re-rendering
   */
  rewriteQueueItem(seed: Seed): void;
  /**
   * To add a seed into queue state
   */
  addSeed(seed: Seed): void;
  /**
   * To skip a overflowed seeds in queue greater than `maxLength`
   */
  skipOverflowSeeds(opts: {maxLength: number}): void;
}

export interface DayoSelectorImpl {
  getQueueComponentProps(): QueueComponentProps;
  getBoxComponentProps(seed: ISeed): BoxComponentProps;
}

export interface QueueComponentProps {
  to: DayoOptions['to'];
  position: DayoOptions['position'];
}

export interface BoxComponentThemeParams {
  transitionTimingFunction: string;
}

export interface BoxComponentProps {
  BlockComponent: BlockComponent;
  theme: BoxComponentThemeParams;
  additionalProps?: object;
  to: DayoOptions['to'];
  isEnter: boolean;
  isEntering: boolean;
  isEntered: boolean;
  isExit: boolean;
  isExiting: boolean;
  isExited: boolean;
  close(): void;
  onTransitionEnd(): void;
}
