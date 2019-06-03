import {BaseThemedCssFunction} from 'styled-components';

export interface NotificationTheme {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
}

export type NofiticationThemedCssFunction = BaseThemedCssFunction<
  NotificationTheme
>;
