import {IDayo, DayoOperatorImpl} from './interfaces';
import {ISeed} from '../entities/seed';

export class DayoOperator<Seed extends ISeed>
  implements DayoOperatorImpl<Seed> {
  public dayo: IDayo<Seed>;

  public constructor(dayo: IDayo<Seed>) {
    this.dayo = dayo;
  }

  private get queue() {
    return this.dayo.getQueue();
  }

  public rewriteQueueItem(seed: Seed) {
    const targetIndex = this.queue.findIndex(item => {
      return item.id === seed.id;
    });

    if (targetIndex === -1) {
      return;
    }

    this.queue[targetIndex] = seed;

    this.dayo.setQueue(this.queue);
  }

  public addSeed(seed: Seed): void {
    this.dayo.setQueue([...this.queue, seed]);
  }

  public skipOverflowSeeds({maxLength}: {maxLength: number}) {
    const addingItemLength = 1;
    const enterePhaseItems = this.queue.filter(item =>
      item.isCycleInEnterPhase(),
    );
    const overflowedLength =
      enterePhaseItems.length + addingItemLength - maxLength;
    const isOverflowed = overflowedLength > 0;

    if (isOverflowed) {
      enterePhaseItems.slice(0, overflowedLength).forEach(seed => {
        seed.skipCycle();
      });
    }
  }
}

export default DayoOperator;
