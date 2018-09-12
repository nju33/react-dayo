import styled from 'styled-components';

export const X = styled.button.attrs({
  'aria-label': 'close button'
})`
  position: relative;
  width: 1em;
  height: 1em;
  border: none;
  border-radius: 50%;
  box-sizing: border-box;
  padding: .6em;
  margin-left: .5em;
  cursor: pointer;
  outline: none;

  &:before,
  &:after {
    content: '';
    position: absolute;
    right: 50%;
    bottom: 50%;
    height: .8em;
    border-left: 1px solid #000;
    display: inline-block;
    background: black;
    transform-origin: center center;
  }

  &:before {
    transform: translate3d(50%, 50%, 0) rotate(45deg);
  }

  &:after {
    transform: translate3d(50%, 50%, 0) rotate(-45deg);
  }
`;
