import {css as baseCss} from 'styled-components';
import {ConfirmThemedCssFunction} from './interfaces';

const css = baseCss as ConfirmThemedCssFunction;
export const mixin = css`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.backgroundColor};
  border: 1px solid;
  border-color: ${props =>
    props.theme.borderColor || props.theme.backgroundColor};
  margin-top: 0.3em;
  box-sizing: border-box;
  .dayo-confirm--body {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: pre;
    padding: 0.5em;
  }
  .dayo-confirm--buttons {
    display: flex;
  }
  .dayo-confirm--deny,
  .dayo-confirm--confirm {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 0.5em 1em;
    cursor: pointer;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      transition: 0.2s;
    }
    &:hover:before {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

export default mixin;
