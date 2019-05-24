export enum CycleStep {
  Enter,
  Entering,
  Entered,
  Exit,
  Exiting,
  Exited,
}

export type IsFn = () => boolean;

export class Cycle {
  private step = CycleStep.Enter;

  private skiped = false;

  public proceed = (): void => {
    switch (this.step) {
      case CycleStep.Enter: {
        this.step = CycleStep.Entering;
        break;
      }

      case CycleStep.Entering: {
        this.step = CycleStep.Entered;
        break;
      }

      case CycleStep.Entered: {
        this.step = CycleStep.Exit;
        break;
      }

      case CycleStep.Exit: {
        this.step = CycleStep.Exiting;
        break;
      }

      case CycleStep.Exiting: {
        this.step = CycleStep.Exited;
        break;
      }

      case CycleStep.Exited:
      default: {
        break;
      }
    }
  };

  public skip(): void {
    this.skiped = true;
  }

  public isSkip = (): boolean => {
    return this.skiped;
  };

  public getCurrentStep(): CycleStep {
    return this.step;
  }

  public isEnter: IsFn = (): boolean => {
    return this.step === CycleStep.Enter;
  };

  public isEntering: IsFn = (): boolean => {
    return this.step === CycleStep.Entering;
  };

  public isEntered: IsFn = (): boolean => {
    return this.step === CycleStep.Entered;
  };

  public isExit: IsFn = (): boolean => {
    return this.step === CycleStep.Exit;
  };

  public isExiting: IsFn = (): boolean => {
    return this.step === CycleStep.Exiting;
  };

  public isExited: IsFn = (): boolean => {
    return this.step === CycleStep.Exited;
  };
}

export default Cycle;
