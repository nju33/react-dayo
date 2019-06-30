import React from 'react';
import {queueStyle, boxStyle} from 'core-dayo';

export interface QueueProps {
  to: 'top' | 'bottom';
  position: 'left' | 'center' | 'right';
}

/* eslint-disable react/prop-types */
export const Queue: React.FC<QueueProps> = (props): JSX.Element => {
  React.useEffect(() => {
    queueStyle.injectStyle();
    boxStyle.injectStyle();
    return () => {
      queueStyle.eliminateStyle();
      boxStyle.eliminateStyle();
    };
  }, []);

  return (
    <aside
      data-component="dayo--queue"
      data-to={props.to}
      data-position={props.position}
      data-testid="dayo--queue"
    >
      {props.children}
    </aside>
  );
};
/* eslint-enable react/prop-types */

Queue.displayName = 'DayoQueue';

export default Queue;
