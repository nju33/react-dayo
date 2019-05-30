import {css} from 'styled-components';

export const mixin = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.8em;
  width: 300px;
  margin-top: 0.3em;

  .header,
  .body {
    padding: 0.5em 1em 0;
    box-sizing: border-box;
  }

  .header {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
  }

  .body {
    width: 100%;
    text-align: center;
    margin: 0.5em 0 1.5em;
  }

  .buttons {
    display: flex;
    text-align: center;
    width: 100%;
  }

  .confirm,
  .deny {
    padding: 0.5em 1em;
    width: 50%;
    cursor: pointer;
  }
`;

export default mixin;
