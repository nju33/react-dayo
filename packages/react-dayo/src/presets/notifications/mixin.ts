import {css} from 'styled-components';

const SUMI = '#1c1c1c';
const WAKADAKE = '#5dac81';

export const mixin = css`
  display: flex;
  align-items: center;
  font-size: .8em;
  color: '${SUMI}';
  background: ${WAKADAKE};
  border: 1px solid ${WAKADAKE};
  padding: 0.25em 0.5em;
  margin-top: 0.3em;
  box-sizing: border-box;

  .dayo-nootification--middle {
    margin: 0 0.5em;
  }
  .dayo-notification--right {
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

export default mixin;
