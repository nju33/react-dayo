import React from 'react';
import styled, {StyledComponentBase} from 'styled-components';

const component = ({} as unknown) as {
  container: StyledComponentBase<'aside', {}>;
};

/* eslint-disable react/prop-types */
export const Queue: React.FC<{}> = (props): JSX.Element => {
  return (
    <component.container>
      {props.children}
      {/* <div>hoge</div> */}
      {/* <div>sadge</div> */}
    </component.container>
  );
};
/* eslint-enable react/prop-types */

Queue.displayName = 'Dayo(Queue)';

component.container = styled.aside`
  position: fixed;
  left: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export default Queue;
