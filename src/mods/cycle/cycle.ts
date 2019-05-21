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

  public proceed(): void {
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
  }

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

  public waitUntil(untilFn: IsFn, msec = 10000): Promise<void> {
    return new Promise(
      (resolve, reject): void => {
        let prevTime = Date.now();
        let totalTime = 0;
        const intervalId = setInterval((): void => {
          if (untilFn()) {
            clearInterval(intervalId);
            resolve();
          }

          if (msec < totalTime) {
            clearInterval(intervalId);
            reject();
          }

          const currentTime = Date.now();
          totalTime += currentTime - prevTime;
          prevTime = currentTime;
        }, 250);
      },
    );
  }

  public waitUntilEntering(msec = 10000): Promise<void> {
    return this.waitUntil(this.isEntering, msec);
  }

  public waitUntilEntered(msec = 10000): Promise<void> {
    return this.waitUntil(this.isEntered, msec);
  }

  public waitUntilExit(msec = 10000): Promise<void> {
    return this.waitUntil(this.isExit, msec);
  }

  public waitUntilExiting(msec = 10000): Promise<void> {
    return this.waitUntil(this.isExiting, msec);
  }

  public waitUntilExited(msec = 10000): Promise<void> {
    return this.waitUntil(this.isExited, msec);
  }
}

export default Cycle;
