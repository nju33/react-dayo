export type DayoOptionTo = 'top' | 'bottom';

export type DayoOptionPosition = 'left' | 'center' | 'right';

export interface DayoOptions {
  to: DayoOptionTo;
  position: DayoOptionPosition;
  maxLength: number;
}

export type DayoProps = DayoOptions;

// export interface DayoStruct<T> {
//   state: {
//     queue: T[];
//   };
//   render(): JSX.Element;
// }

export interface DayoImpl<Seed> {
  getQueue(): Seed[];
  setQueue(queue: Seed[]): void;
}

export type IDayo<Seed> = DayoImpl<Seed>;

export interface DayoState<Seed> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queue: Seed[];
}

export interface DayoOperatorsImpl<Seed> {
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
