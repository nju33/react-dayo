import styled from 'styled-components';

export const CloseIcon = styled.div`
  color: inherit;
  position: absolute;
  margin-left: 0;
  margin-top: 0.4em;
  width: 1.5em;
  height: 1em;
  text-align: center;

  &:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &:after {
    content: '';
    position: absolute;
    width: 15px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`;
