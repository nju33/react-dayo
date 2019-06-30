import {IDayo} from './interfaces';
import {ISeed} from '../entities/seed';
import {DayoSelectorImpl} from './interfaces';

export class DayoSelector implements DayoSelectorImpl {
  public dayo: IDayo<unknown>;

  public constructor(dayo: IDayo<unknown>) {
    this.dayo = dayo;
  }

  public getQueueComponentProps() {
    return {
      to: this.dayo.getOption('to'),
      position: this.dayo.getOption('position'),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getBoxComponentProps(seedOnCycle: ISeed) {
    if (seedOnCycle.BlockComponent === undefined) {
      throw new Error('BlockComponent is undefined');
    }

    if (seedOnCycle.values === undefined) {
      throw new Error('Unexpected error');
    }

    return {
      to: this.dayo.getOption('to'),
      BlockComponent: seedOnCycle.BlockComponent,
      additionalProps: seedOnCycle.values.props,
      theme: seedOnCycle.theme,
      close: seedOnCycle.close,
      isEnter: seedOnCycle.cycle.isEnter(),
      isEntering: seedOnCycle.cycle.isEntering(),
      isEntered: seedOnCycle.cycle.isEntered(),
      isExit: seedOnCycle.cycle.isExit(),
      isExiting: seedOnCycle.cycle.isExiting(),
      isExited: seedOnCycle.cycle.isExited(),
      onTransitionEnd: this.dayo.onTransitionEnd(seedOnCycle),
    };
  }
}

export default DayoSelector;
