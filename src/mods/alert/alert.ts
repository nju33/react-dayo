import AlertImpl from './alert-impl';

export interface ConstructorDataArgument {
  name: string;
  color: string;
}

export default class Alert implements AlertImpl {
  private static memo = new Map<string, AlertImpl>();

  public static create(data: ConstructorDataArgument): Alert {
    const key = JSON.stringify(data);
    if (this.memo.has(key)) {
      return (this.memo.get(key) as unknown) as Alert;
    }

    const alert = new Alert(data);
    this.memo.set(key, alert);
    return alert;
  }

  public name: string;

  public color: string;

  private constructor(data: ConstructorDataArgument) {
    this.name = data.name;
    this.color = data.color;
  }
}
