import {Step} from './constants/step';

export type IsFn = () => boolean;

export interface CycleImpl {
  /**
   * To advance to the next step
   */
  proceed(): void;

  /**
   * To skip to the 'entering' and 'entered' steps
   */
  skip(): void;

  /**
   * Whether skipped
   */
  isSkip(): boolean;

  /**
   * Whether in `isEntering` or `isEntered` step.
   */
  isEnterPhase(): boolean;

  /**
   * To get current step
   */
  getCurrentStep(): Step;

  isEnter(): boolean;

  isEntering(): boolean;

  isEntered(): boolean;

  isExit(): boolean;

  isExiting(): boolean;

  isExited(): boolean;
}
