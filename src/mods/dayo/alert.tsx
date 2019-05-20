import React from 'react';
import styled, {
  css,
  ThemedBaseStyledInterface,
  StyledComponentBase,
  BaseThemedCssFunction,
} from 'styled-components';
import {darken} from 'polished';
import {DayoCycle} from '../../dayo/dayo-cycle';

export interface Theme {
  color: string;
  transition?: string;
  fontSize?: string;
  borderRadius?: string;
}

export interface Props {
  theme: Theme;
  'data-position': string;
  'data-cycle': string;
}
const alertStyled = styled as ThemedBaseStyledInterface<Theme>;

const aside = ({} as unknown) as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alert: StyledComponentBase<'aside', any>;
};

const noop = (color: Theme['color']): Theme['color'] => color;
const getColor = (
  adjustFn: Function = noop,
): ((props: Props) => Theme['color']) => (props: Props): Theme['color'] =>
  adjustFn(props.theme.color);
const getRawColor = getColor();
const getDarkenColor = getColor(
  (color: Theme['color']): string => darken(0.15, color),
);

const defaultTransition = '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
const getTransition = (props: Props): Theme['transition'] =>
  props.theme.transition || defaultTransition;

const defaultFontSize = '14px';
const getFontSize = (props: Props): Theme['transition'] =>
  props.theme.fontSize || defaultFontSize;

const defaultBorderRadius = '0';
const getBorderRadius = (props: Props): Theme['borderRadius'] =>
  props.theme.borderRadius || defaultBorderRadius;

aside.alert = alertStyled.aside`
  display: inline-flex;
  align-items: center;
  padding: 0.1em 0.4em;
  white-space: pre;
  position: relative;
  user-select: none;
  color: transparent;
  margin-bottom: 4px;
  border: 1px solid;
  font-size: ${getFontSize};
  border-radius: ${getBorderRadius};
  background-color: ${getRawColor};
  border-color: ${getDarkenColor};

  ${(props: Props): BaseThemedCssFunction<any> => {
    // const color = getColor()(props);
    const position = props['data-position'];
    const cycle = props['data-cycle'];

    switch (cycle) {
      case DayoCycle.Creating: {
        return css`
          transition: 0.4s
              ${(props: any): any =>
                props.theme.transition ||
                'cubic-bezier(0.68, -0.55, 0.265, 1.55)'},
            color 0.3s 0.2s;
          right: ${((): string => {
            if (
              [DayoPosition.LeftTop, DayoPosition.LeftBottom].indexOf(
                position,
              ) > -1
            ) {
              return '-30%';
            }

            return '30%';
          })()}
          opacity: 0;
          transform: scale(0.8);
        `;
      }

      // case DayoCycle.Created: {
      //   return css`
      //     transition: 0.4s
      //         ${(props: any): any =>
      //           props.theme.transition ||
      //           'cubic-bezier(0.68, -0.55, 0.265, 1.55)'},
      //       color 0.3s 0.2s;
      //     right: 0%;
      //     opacity: 1;
      //     transform: scale(1);
      //     color: ${() => {
      //       if (getLuminance(color) > 0.5) {
      //         return getColor(darken.bind(null, 0.5));
      //       }

      //       return getColor(lighten.bind(null, 0.5));
      //     }};
      //   `;
      // }

      // case DayoCycle.Deleting: {
      //   return css`
      //     transition: 0.4s
      //         ${props =>
      //           props.theme.transition ||
      //           'cubic-bezier(0.68, -0.55, 0.265, 1.55)'}
      //         0.1s,
      //       color 0.2s;
      //     right: 0%;
      //     padding: 0;
      //     margin-top: 0;
      //     margin-bottom: 0;
      //     border: none;
      //     height: 0px !important;
      //     overflow: hidden;
      //     opacity: 0;
      //     transform: scale(1);
      //     color: transparent;
      //   `;
      // }

      default: {
        return '';
      }
    }
  }};

  /* icon by type */
  & svg:first-child {
    transform: scale(0.8);
    margin-right: 0.3em;
  }

  /* close icon */
  & svg:last-child {
    transition: ${getTransition};
    transform: scale(0.69);
    margin-left: 0.3em;
    cursor: pointer;
    opacity: 0.6;
  }

  & svg:last-child:hover {
    transform: scale(1);
    opacity: 1;
  }
`;

export class Alert extends React.Component {}
