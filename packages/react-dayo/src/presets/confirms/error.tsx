import React from 'react';
import styled from 'styled-components';
import {Seed, BlockComponentProps} from 'core-dayo';
import {ConfirmProps} from './interfaces';
import mixin from './mixin';

const SUMI = '#1c1c1c';
const KURENAI = '#cb1b45';

const Confirm = styled.div`
  ${mixin}
`;

// eslint-disable-next-line react/prop-types
const Error: React.FC<BlockComponentProps & ConfirmProps> = props => {
  const onConfirmButtonClick = React.useCallback(() => {
    props.close();

    if (props.onButtonClick !== undefined) {
      props.onButtonClick('cnofirm');
    }
  }, [props.onButtonClick]);

  const onDenyButtonClick = React.useCallback(() => {
    props.close();

    if (props.onButtonClick !== undefined) {
      props.onButtonClick('deny');
    }
  }, [props.onButtonClick]);

  return (
    <Confirm
      theme={{
        textColor: SUMI,
        backgroundColor: KURENAI,
      }}
    >
      <div className="dayo-confirm--body">{props.children}</div>
      <div className="dayo-confirm--buttons">
        <div
          className="dayo-confirm--deny"
          role="button"
          onClick={onDenyButtonClick}
        >
          {props.deny || 'No'}
        </div>
        <div
          className="dayo-confirm--confirm"
          role="button"
          onClick={onConfirmButtonClick}
        >
          {props.confirm || 'Yes'}
        </div>
      </div>
      <div />
    </Confirm>
  );
};

export default new Seed<ConfirmProps>(Error).builder;
