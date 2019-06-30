import React from 'react';
import styled from 'styled-components';
import {Seed, BlockComponentProps} from 'core-dayo';
import mixin from './mixin';
import CloseIcon from '../../components/close-icon';

const SUMI = '#1c1c1c';
const ROKUSYOH = '#24936e';

const Notification = styled.div`
  ${mixin}
`;

// eslint-disable-next-line react/prop-types
const Success: React.FC<BlockComponentProps> = (props): JSX.Element => {
  return (
    <Notification
      theme={{
        textColor: SUMI,
        backgroundColor: ROKUSYOH,
      }}
    >
      <div className="dayo-notification--middle">{props.children}</div>
      <div className="dato-notification--right">
        <CloseIcon onClick={props.close} />
      </div>
    </Notification>
  );
};

export default new Seed(Success, {timeout: 5000}).builder;
