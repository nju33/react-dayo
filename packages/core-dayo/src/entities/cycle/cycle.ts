import {Step} from './constants/step';
import {CycleImpl} from './interfaces';

export class Cycle implements CycleImpl {
  private step = Step.Enter;

  private skiped = false;

  public proceed = () => {
    switch (this.step) {
      case Step.Enter: {
        this.step = Step.Entering;
        break;
      }

      case Step.Entering: {
        this.step = Step.Entered;
        break;
      }

      case Step.Entered: {
        this.step = Step.Exit;
        break;
      }

      case Step.Exit: {
        this.step = Step.Exiting;
        break;
      }

      case Step.Exiting: {
        this.step = Step.Exited;
        break;
      }

      case Step.Exited:
      default: {
        break;
      }
    }
  };

  public skip() {
    this.skiped = true;
  }

  public isSkip = () => this.skiped;

  public isEnterPhase = () => this.isEntering() || this.isEntered();

  public getCurrentStep() {
    return this.step;
  }

  public isEnter = () => this.step === Step.Enter;

  public isEntering = () => this.step === Step.Entering;

  public isEntered = () => this.step === Step.Entered;

  public isExit = () => this.step === Step.Exit;

  public isExiting = () => this.step === Step.Exiting;

  public isExited = () => this.step === Step.Exited;
}

export default Cycle;
