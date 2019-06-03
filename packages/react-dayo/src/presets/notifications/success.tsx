import React from 'react';
import styled from 'styled-components';
import Seed, {BlockComponentProps} from '../../entities/seed';
import mixin from './mixin';
import CloseIcon from '../../components/close-icon';

const SUMI = '#1c1c1c';
const WAKADAKE = '#5dac81';

const Alert = styled.div`
  ${mixin}
`;

// eslint-disable-next-line react/prop-types
const Success: React.FC<BlockComponentProps> = (props): JSX.Element => {
  return (
    <Alert
      theme={{
        textColor: SUMI,
        backgroundColor: WAKADAKE,
      }}
    >
      <div className="dayo-notification--middle">{props.children}</div>
      <div className="dato-notification--right">
        <CloseIcon onClick={props.close} />
      </div>
    </Alert>
  );
};

export default new Seed(Success, {timeout: 5000}).builder;
