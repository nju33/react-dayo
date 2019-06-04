import DayoOperator from './dayo-operator';
import {DayoImpl} from './interfaces';
import {SeedCycleImpl} from '../entities/seed';

describe('DayoOperators', () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let mockDayo: DayoImpl<any> & {queue: any[]};
  let operators: DayoOperator<any>;

  beforeEach(() => {
    mockDayo = {
      queue: [],
      getQueue() {
        return this.queue;
      },
      setQueue(queue: any[]) {
        this.queue = queue;
      },
      getOption() {
        throw new Error('not implement');
      },
      onTransitionEnd() {
        throw new Error('not implement');
      },
    };

    operators = new DayoOperator<any>(mockDayo);
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  test('#rewriteQueueItem', () => {
    const initialQueue = [
      {
        id: 1,
        _test: 'foo',
      },
      {
        id: 2,
        _test: 'bar',
      },
    ];

    const expectedQueue = [
      {
        id: 1,
        _test: 'foo123',
      },
      initialQueue[1],
    ];

    operators.addSeed(expectedQueue[0]);
    operators.addSeed(expectedQueue[1]);

    operators.rewriteQueueItem(expectedQueue);

    expect(mockDayo.queue).toEqual(expectedQueue);
  });

  test('#addSeed', () => {
    const expectedQueue = [{}, {}];
    operators.addSeed(expectedQueue[0]);
    operators.addSeed(expectedQueue[1]);

    expect(mockDayo.queue).toEqual(expectedQueue);
  });

  test('#skipOverflowSeeds', () => {
    const skipCycleOfFirstSeed = jest.fn();
    const skipCycleOfSecondSeed = jest.fn();

    const expectedQueue: SeedCycleImpl[] = [
      {
        isCycleInEnterPhase: () => true,
        skipCycle: skipCycleOfFirstSeed,
      },
      {
        isCycleInEnterPhase: () => false,
        skipCycle: skipCycleOfSecondSeed,
      },
    ];
    operators.addSeed(expectedQueue[0]);
    operators.addSeed(expectedQueue[1]);

    operators.skipOverflowSeeds({maxLength: 1});

    expect(skipCycleOfFirstSeed.mock.calls).toHaveLength(1);
    expect(skipCycleOfSecondSeed.mock.calls).toHaveLength(0);
  });
});
