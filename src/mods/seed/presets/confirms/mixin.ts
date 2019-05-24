import {css} from 'styled-components';
import {KUCHIBA, SHIRONERI} from '../../constants/colors';

export const mixin = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .8em;
  color: '${SHIRONERI}';
  background: ${KUCHIBA};
  border: 1px solid ${KUCHIBA};
  padding: 0.25em 0.5em;
  margin-top: 0.3em;

  .buttons {
    display: flex;
    text-align: center;
  }

  .confirm,
  .deny {
    padding: .3em .5em;
  }
`;

export default mixin;
