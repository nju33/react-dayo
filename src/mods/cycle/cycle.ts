export enum CycleStep {
  Creating,
  Created,
  Deleting,
  Deleted,
}

export default class Cycle {
  private step = CycleStep.Creating;

  public proceed(): void {
    if (this.step === CycleStep.Creating) {
      this.step = CycleStep.Created;
    } else if (this.step === CycleStep.Created) {
      this.step = CycleStep.Deleting;
    } else {
      this.step = CycleStep.Deleted;
    }
  }

  public getCurrentStep(): CycleStep {
    return this.step;
  }

  public isCreating(): boolean {
    return this.step === CycleStep.Creating;
  }

  public isCreated(): boolean {
    return this.step === CycleStep.Created;
  }

  public isDeleting(): boolean {
    return this.step === CycleStep.Deleting;
  }

  public isDeleted(): boolean {
    return this.step === CycleStep.Deleted;
  }
}
