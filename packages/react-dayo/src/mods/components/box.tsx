import React, {useRef, useEffect} from 'react';
import rawStyled, {
  StyledComponentBase,
  ThemedBaseStyledInterface,
} from 'styled-components';
import {BlockComponent} from '../seed/seed-impl';

export interface BoxTheme {
  transitionTimingFunction: string;
}

const styled = rawStyled as ThemedBaseStyledInterface<BoxTheme>;

const component = ({} as unknown) as {
  container: StyledComponentBase<'div', {}>;
};

export interface BoxProps {
  Block: BlockComponent;
  theme: BoxTheme;
  additionalProps?: object;
  close(): void;
  to: 'top' | 'bottom';
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
      data-to={props.to}
      data-is-enter={props.isEnter}
      data-is-entering={props.isEntering}
      data-is-entered={props.isEntered}
      data-is-delete={props.isExit}
      data-is-deleting={props.isExiting}
      data-is-deleted={props.isExited}
      onTransitionEnd={props.onTransitionEnd}
    >
      <div ref={middleAreaRef}>
        <props.Block close={props.close} {...props.additionalProps || {}}>
          {props.children}
        </props.Block>
      </div>
    </component.container>
  );
};
/* eslint-enable react/prop-types */

Box.displayName = 'Dayo(Box)';

component.container = styled.div`
  display: flex;
  align-items: center;
  transition: 0.5s
    ${(props): BoxTheme['transitionTimingFunction'] =>
      props.theme.transitionTimingFunction};
  opacity: 1;

  &[data-is-enter='true'] {
    will-change: transform;
    transition: none;
    opacity: 0;
  }

  &[data-is-enter='true'] {
    color: orange;
  }

  &[data-is-enter='true'][data-to='top'] {
    transform: translate3d(0, 0.5em, 0);
  }

  &[data-is-enter='true'][data-to='bottom'] {
    transform: translate3d(0, -0.5em, 0);
  }

  &[data-is-entering='true'] {
    transition-property: transform, opacity;
    will-change: transform, opacity;
    opacity: 1;
  }

  /* &[data-is-entered='true'] {
    transform: translate3d(0, 0, 0);
  } */

  /* &[data-is-delete='true'] {
  } */

  &[data-is-deleting='true'] {
    transition-property: transform margin, padding, opacity, height;
    /* transition-duration: 0.3s; */
    transition-duration: 0.3s;
    will-change: transform, margin, padding, opacity, height;
    overflow: hidden;
    backface-visibility: hidden;
    &[data-to='top'] {
      transform: translate3d(0, -0.5em, 0);
    }
    &[data-to='bottom'] {
      transform: translate3d(0, 0.5em, 0);
    }
    padding: 0;
    margin: 0;
    opacity: 0;
    height: 0 !important;
  }

  &[data-is-deleted='true'] {
    transition-duration: none;
    transition-duration: 0;
    &[data-to='top'] {
      transform: translate3d(0, -0.5em, 0) scale(0.7);
    }
    &[data-to='bottom'] {
      transform: translate3d(0, 0.5em, 0) scale(0.7);
    }
    overflow: hidden;
    padding: 0;
    margin: 0;
    opacity: 0;
    height: 0 !important;
  }

  > div {
    text-align: center;
  }
`;

export default Box;
