import React from 'react';
import styled, {css} from 'styled-components';
import {BlockComponentProps} from '../../seed-impl';
import SeedFactory from '../../seed-factory';
import {SHIRONEZUMI, SHIRONERI, SUMI} from '../../constants/colors';
import CloseIcon from '../../../components/close-icon';

export const mixin = css`
  display: flex;
  align-items: center;
  font-size: .8em;
  color: '${SUMI}';
  background: ${SHIRONERI};
  border: 1px solid ${SHIRONEZUMI};
  padding: 0.25em 0.5em;
  margin-top: 0.3em;

  .middle {
    margin: 0 0.5em;
  }

  .right {
    svg {
      height: 0.7em;
      opacity: 0.7;
      transition: 0.2s;
      transition-property: height, opacity;
    }
    svg:hover {
      height: 0.8em;
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const Alert = styled.div`
  ${mixin}
`;

// eslint-disable-next-line react/prop-types
const LogAlert: React.FC<BlockComponentProps> = (props): JSX.Element => {
  return (
    <Alert>
      <div className="middle">{props.children}</div>
      <div className="right">
        <CloseIcon onClick={props.close} />
      </div>
    </Alert>
  );
};

export default SeedFactory.create({key: 'log'}, LogAlert);
