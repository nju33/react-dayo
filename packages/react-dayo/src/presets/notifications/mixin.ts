import {css as baseCss} from 'styled-components';
import {NofiticationThemedCssFunction} from './interfaces';

const css = baseCss as NofiticationThemedCssFunction;
export const mixin = css`
  display: flex;
  align-items: center;
  font-size: .8em;
  color: '${props => props.theme.textColor}';
  background-color: ${props => props.theme.backgroundColor};
  border: 1px solid;
  border-color: ${props =>
    props.theme.borderColor || props.theme.backgroundColor};
  padding: 0.25em 0.5em;
  margin-top: 0.3em;
  box-sizing: border-box;

  .dayo-notification--middle {
    margin: 0 0.5em;
  }

  .dato-notification--right {
    display: flex;
    align-items: center;
  }

  .dato-notification--right svg {
    height: .7em;
    opacity: 0.7;
    transition: 0.2s;
    transition-property: height, opacity;
  }

  .dato-notification--right svg:hover {
    height: 0.8em;
    opacity: 1;
    cursor: pointer;
  }
`;

export default mixin;
