export interface IntervalImpl<Item> {
  wait(
    item: Item,
    condition: (onTick: (cb: () => void) => void) => Promise<void>,
  ): Promise<void>;
}

export default IntervalImpl;
