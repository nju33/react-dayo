import AlertImpl from './alert-impl';

export default class Alert implements AlertImpl {
  private static memo = new Map<string, AlertImpl>();

  public static create(data: AlertImpl['data']): AlertImpl {
    const key = JSON.stringify(data);
    if (this.memo.has(key)) {
      return (this.memo.get(key) as unknown) as AlertImpl;
    }

    const alert = new Alert(data);
    this.memo.set(key, alert);
    return alert;
  }

  public data: AlertImpl['data'];

  private constructor(data: AlertImpl['data']) {
    this.data = data;
  }

  public icon(icon: string): this {
    this.data.icon = icon;
    return this;
  }

  public message(message: string): this {
    this.data.message = message;
    return this;
  }
}
