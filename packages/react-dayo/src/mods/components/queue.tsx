import React from 'react';
import styled, {StyledComponentBase} from 'styled-components';

const component = ({} as unknown) as {
  container: StyledComponentBase<'aside', {}>;
};

export interface QueueProps {
  to: 'top' | 'bottom';
}

/* eslint-disable react/prop-types */
export const Queue: React.FC<QueueProps> = (props): JSX.Element => {
  return (
    <component.container data-to={props.to}>
      {props.children}
    </component.container>
  );
};
/* eslint-enable react/prop-types */

Queue.displayName = 'Dayo(Queue)';

component.container = styled.aside`
  position: fixed;
  font-size: 0.8em;
  display: flex;
  justify-content: flex-start;
  backface-visibility: hidden;
  transform: translateZ(0);

  &[data-to='top'] {
    flex-direction: column;
    align-items: flex-start;
    left: 0;
    top: 0;
  }

  &[data-to='bottom'] {
    flex-direction: column-reverse;
    align-items: flex-end;
    right: 0;
    bottom: 0;
  }
`;

export default Queue;
