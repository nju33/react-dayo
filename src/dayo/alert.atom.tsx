import styled from 'styled-components';
import {getLuminance} from 'polished';

export const Alert = styled.div`
  background: ${props => props.theme.color};
  color: ${props => {
    if (getLuminance(props.theme.color) > 0.5) {
      return '#000';
    }

    return '#fff';
  }};
  transition: .2s;
  display: flex;
  align-items: center;
  padding: .3em .5em;
`;
