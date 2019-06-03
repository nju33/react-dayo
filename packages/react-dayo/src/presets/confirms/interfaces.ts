import {BaseThemedCssFunction} from 'styled-components';

export interface ConfirmTheme {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
}

export type ConfirmThemedCssFunction = BaseThemedCssFunction<ConfirmTheme>;

export interface ConfirmProps {
  /**
   * To define to text of the title of confirm
   */
  title?: React.ReactNode;
  /**
   * To define the text of the button that confirms the action.
   */
  confirm?: React.ReactNode;
  /**
   *  To define the text of the button that cancels the action
   */
  deny?: React.ReactNode;
  onButtonClick?: (type: 'cnofirm' | 'deny') => void;
}
