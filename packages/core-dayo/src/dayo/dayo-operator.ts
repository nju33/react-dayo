import {IDayo, DayoOperatorsImpl} from './interfaces';
import {ISeed} from '../entities/seed';

export class DayoOperator<Seed extends ISeed>
  implements DayoOperatorsImpl<Seed> {
  public dayo: IDayo<Seed>;

  public constructor(dayo: IDayo<Seed>) {
    this.dayo = dayo;
  }

  public rewriteQueueItem(seed: Seed) {
    const queue = this.dayo.getQueue();
    const targetIndex = queue.findIndex(item => {
      return item.id === seed.id;
    });

    if (targetIndex === -1) {
      return;
    }

    queue[targetIndex] = seed;

    this.dayo.setQueue(queue);
  }

  public addSeed(seed: Seed): void {
    this.dayo.setQueue([...this.dayo.getQueue(), seed]);
  }

  public skipOverflowSeeds(opts: {maxLength: number}) {
    // const queueMaxLength = this.getOption('maxLength');
    const enteredItems = this.dayo
      .getQueue()
      .filter(item => item.cycle.isEntering() || item.cycle.isEntered());

    const addingItemLength = 1;
    const overflowLength =
      enteredItems.length + addingItemLength - opts.maxLength;

    if (overflowLength > 0) {
      enteredItems.slice(0, overflowLength).forEach(seedOnCycle => {
        seedOnCycle.cycle.skip();
      });
    }
  }
}

export default DayoOperator;
