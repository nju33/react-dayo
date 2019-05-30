import {BlockComponent} from '../../mods/seed/seed-impl';

export type BoxBlockComponent =
  | React.ComponentClass<{}>
  | React.FunctionComponent<{}>
  | React.ExoticComponent<{}>;

export interface BoxThemeParams {
  transitionTimingFunction: string;
}

export interface BoxProps {
  Block: BlockComponent;
  theme: BoxThemeParams;
  additionalProps?: object;
  to: 'top' | 'bottom';
  isEnter: boolean;
  isEntering: boolean;
  isEntered: boolean;
  isExit: boolean;
  isExiting: boolean;
  isExited: boolean;
  close(): void;
  onTransitionEnd(): void;
}
