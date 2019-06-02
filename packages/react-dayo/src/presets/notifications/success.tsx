import React from 'react';
import styled from 'styled-components';
import Seed, {BlockComponentProps} from '../../entities/seed';
import mixin from './mixin';
import CloseIcon from '../../components/close-icon';

const Alert = styled.div`
  ${mixin}
`;

// eslint-disable-next-line react/prop-types
const Success: React.FC<BlockComponentProps> = (props): JSX.Element => {
  return (
    <Alert>
      <div className="dayo-notification--middle">{props.children}</div>
      <div className="dato-notification--right">
        <CloseIcon onClick={props.close} />
      </div>
    </Alert>
  );
};

export default new Seed(Success).builder;
