import React, {useRef, useEffect} from 'react';
import rawStyled, {
  StyledComponentBase,
  ThemedBaseStyledInterface,
} from 'styled-components';

export interface BoxTheme {
  textColor: string;
  backgroundColor: string;
  transitionTimingFunction: string;
}

const styled = rawStyled as ThemedBaseStyledInterface<BoxTheme>;

const component = ({} as unknown) as {
  container: StyledComponentBase<'div', {}>;
};

export interface BoxProps {
  theme: BoxTheme;
  isEnter: boolean;
  isEntering: boolean;
  isEntered: boolean;
  isExit: boolean;
  isExiting: boolean;
  isExited: boolean;
  onTransitionEnd(): void;
}

/* eslint-disable react/prop-types */
export const Box: React.FC<BoxProps> = (props): JSX.Element => {
  const containerRef = useRef(undefined);

  useEffect(
    (): void => {
      if (!props.isEnter) {
        return;
      }

      if (containerRef.current !== undefined) {
        containerRef.current.style.height = `${
          containerRef.current.clientHeight
        }px`;
      }
    },
  );

  return (
    <component.container
      ref={containerRef}
      theme={props.theme}
      data-is-enter={props.isEnter}
      data-is-entering={props.isEntering}
      data-is-entered={props.isEntered}
      data-is-delete={props.isExit}
      data-is-deleting={props.isExiting}
      data-is-deleted={props.isExited}
      onTransitionEnd={props.onTransitionEnd}
    >
      {props.children}
    </component.container>
  );
};
/* eslint-enable react/prop-types */

Box.displayName = 'Dayo(Box)';

component.container = styled.div`
  /* display: 'inline-block'; */
  /* width: 100%; */
  color: ${(props): BoxTheme['textColor'] => props.theme.textColor};
  background-color: ${(props): BoxTheme['backgroundColor'] =>
    props.theme.backgroundColor};
  transition: 0.5s
    ${(props): BoxTheme['transitionTimingFunction'] =>
      props.theme.transitionTimingFunction};
  transition-property: margin, opacity;

  margin: 5px 0;
  opacity: 1;

  &[data-is-enter='true'] {
    transition: none;
    margin: 20px 0;
    opacity: 0;
  }

  &[data-is-entering='true'] {
    margin: 5px 0;
    opacity: 1;
  }

  &[data-is-entered='true'] {
    transition: none;
  }

  &[data-is-delete='true'] {
    transition-property: none;
    overflow: hidden;
    margin: 5px 0;
    opacity: 1;
  }

  &[data-is-deleting='true'] {
    transition-property: margin, opacity, height;
    transition-duration: 0.3s;
    overflow: hidden;
    margin: 0;
    opacity: 0;
    height: 0 !important;
  }

  &[data-is-deleted='true'] {
    transition-duration: none;
    transition-duration: 0;
    overflow: hidden;
    margin: 0;
    opacity: 0;
    height: 0 !important;
  }
`;

export default Box;
