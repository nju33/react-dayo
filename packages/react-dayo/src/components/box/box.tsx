import React, {useRef, useEffect} from 'react';
import {BlockComponent} from 'core-dayo';

export interface BoxTheme {
  transitionTimingFunction: string;
}

export interface BoxProps {
  BlockComponent: BlockComponent | undefined;
  theme: BoxTheme;
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

const init = (refs: {
  container: React.RefObject<HTMLDivElement>;
  middleArea: React.RefObject<HTMLDivElement>;
}): void => {
  if (refs.container.current !== null && refs.middleArea.current !== null) {
    refs.container.current.style.height = `${
      refs.middleArea.current.clientHeight
    }px`;
  }
};

/* eslint-disable react/prop-types */
export const Box: React.FC<BoxProps> = (props): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const middleAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.isEnter) {
      init({container: containerRef, middleArea: middleAreaRef});
    }
  }, [
    props.isEnter,
    props.isEntering,
    props.isEntered,
    props.isExit,
    props.isExiting,
    props.isExited,
  ]);

  return (
    <div
      data-component="dayo--box"
      ref={containerRef}
      aria-live="assertive"
      data-to={props.to}
      data-is-enter={props.isEnter}
      data-is-entering={props.isEntering}
      data-is-entered={props.isEntered}
      data-is-delete={props.isExit}
      data-is-deleting={props.isExiting}
      data-is-deleted={props.isExited}
      onTransitionEnd={props.onTransitionEnd}
      data-testid="dayo--box"
    >
      <div ref={middleAreaRef}>
        {props.BlockComponent === undefined ? null : (
          <props.BlockComponent
            close={props.close}
            {...props.additionalProps || {}}
          >
            {props.children}
          </props.BlockComponent>
        )}
      </div>
    </div>
  );
};
/* eslint-enable react/prop-types */

Box.displayName = 'DayoBox';

export default Box;
