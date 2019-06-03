import React from 'react';
import styled, {StyledComponentBase} from 'styled-components';

const component = ({} as unknown) as {
  container: StyledComponentBase<'aside', {}>;
};

export interface QueueProps {
  to: 'top' | 'bottom';
  position: 'left' | 'center' | 'right';
}

/* eslint-disable react/prop-types */
export const Queue: React.FC<QueueProps> = (props): JSX.Element => {
  return (
    <component.container
      data-to={props.to}
      data-position={props.position}
      data-testid="dayo--queue"
    >
      {props.children}
    </component.container>
  );
};
/* eslint-enable react/prop-types */

Queue.displayName = 'Dayo(Queue)';

component.container = styled.aside`
  width: 100%;
  font-size: 0.8em;
  display: flex;
  justify-content: flex-start;
  backface-visibility: hidden;
  transform: translateZ(0);

  &[data-to='top'] {
    flex-direction: column;
  }

  &[data-to='bottom'] {
    flex-direction: column-reverse;
  }

  &[data-position='left'] {
    align-items: flex-start;
  }

  &[data-position='center'] {
    align-items: center;
  }

  &[data-position='right'] {
    align-items: flex-end;
  }
`;

export default Queue;
