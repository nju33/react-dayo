import React from 'react';
import styled from 'styled-components';
import {BlockComponentProps} from '../../seed-impl';
import SeedFactory from '../../seed-factory';
import ConfirmProps from './confirm-props';
import confirmMixin from './mixin';

const Confirm = styled.section`
  ${confirmMixin}
`;

const UnfrendlyConfirm: React.NamedExoticComponent<
  ConfirmProps & BlockComponentProps
> = React.memo(
  (props): JSX.Element => {
    return (
      <Confirm>
        <header className="header">
          <div>{props.title}</div>
        </header>
        <div className="body">
          <div>{props.children}</div>
        </div>
        <div className="buttons">
          <div className="deny" onClick={props.close}>
            {props.deny || 'いいえ'}
          </div>
          <div className="confirm" onClick={props.close}>
            {props.confirm || 'はい'}
          </div>
        </div>
        <div />
      </Confirm>
    );
  },
  (prevProps, nextProps): boolean => {
    const equal: boolean =
      prevProps.title === nextProps.title &&
      prevProps.confirm === nextProps.confirm &&
      prevProps.deny === nextProps.deny &&
      prevProps.children === nextProps.children;

    return equal;
  },
);
UnfrendlyConfirm.displayName = 'UnfrendlyConfirm';

export default SeedFactory.create<ConfirmProps>(
  {key: 'unfriendly'},
  UnfrendlyConfirm,
);
