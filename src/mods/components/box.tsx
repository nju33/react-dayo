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
  icon?: JSX.Element;
  onTransitionEnd(): void;
}

/* eslint-disable react/prop-types */
export const Box: React.FC<BoxProps> = (props): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const middleAreaRef = useRef<HTMLDivElement>(null);

  useEffect(
    (): void => {
      if (!props.isEnter) {
        return;
      }

      if (containerRef.current !== null && middleAreaRef.current !== null) {
        containerRef.current.style.height = `${
          middleAreaRef.current.clientHeight
        }px`;
      }
    },
  );

  return (
    <component.container
      ref={containerRef}
      theme={props.theme}
      aria-live="assertive"
      data-is-enter={props.isEnter}
      data-is-entering={props.isEntering}
      data-is-entered={props.isEntered}
      data-is-delete={props.isExit}
      data-is-deleting={props.isExiting}
      data-is-deleted={props.isExited}
      onTransitionEnd={props.onTransitionEnd}
    >
      <div className="dayo-Alert_LeftArea">{props.icon}</div>
      <div ref={middleAreaRef}>{props.children}</div>
      <div className="dayo-Alert_RightArea">{props.icon}</div>
    </component.container>
  );
};
/* eslint-enable react/prop-types */

Box.displayName = 'Dayo(Box)';

component.container = styled.div`
  display: flex;
  align-items: center;
  color: ${(props): BoxTheme['textColor'] => props.theme.textColor};
  background-color: ${(props): BoxTheme['backgroundColor'] =>
    props.theme.backgroundColor};
  transition: 0.5s
    ${(props): BoxTheme['transitionTimingFunction'] =>
      props.theme.transitionTimingFunction};
  transform: translate3d(0, 0, 0);
  padding: 0.25em 0.5em;

  margin: 0.15em 0;
  opacity: 1;

  &[data-is-enter='true'] {
    will-change: transform;
    transition: none;
    transform: translate3d(0, 0.5em, 0);
    opacity: 0;
  }

  &[data-is-entering='true'] {
    transition-property: transform, opacity;
    will-change: transform, opacity;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  /*
  &[data-is-entered='true'] {
  }

  &[data-is-delete='true'] {
  }
 */

  &[data-is-deleting='true'] {
    transition-property: transform margin, padding, opacity, height;
    transition-duration: 0.3s;
    will-change: transform, margin, padding, opacity, height;
    overflow: hidden;
    transform: translate3d(0, -0.5em, 0) scale(0.7);
    padding: 0;
    margin: 0;
    opacity: 0;
    height: 0 !important;
  }

  &[data-is-deleted='true'] {
    transition-duration: none;
    transition-duration: 0;
    transform: translate3d(0, -0.5em, 0) scale(0.7);
    overflow: hidden;
    padding: 0;
    margin: 0;
    opacity: 0;
    height: 0 !important;
  }

  .dayo-Alert_LeftArea:empty,
  .dayo-Alert_RightArea:empty {
    display: none;
  }
`;

export default Box;
