export interface IntervalImpl {
  wait(
    item: unknown,
    condition: (onTick: (cb: () => void) => void) => Promise<void>,
  ): Promise<void>;
}

export type IInterval = IntervalImpl;
