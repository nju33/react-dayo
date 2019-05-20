export interface InstanceData {
  name: string;
  color: string;
  icon?: string;
  message?: string;
}

export default interface AlertImpl {
  data: InstanceData;
  icon(icon: string): this;
  message(message: string): this;
}
