import styled, {css} from 'styled-components';
import {DayoPosition} from './dayo-position';

export const Holder = styled.div`
  position: absolute;
  display: flex;
  margin: 8px;

  ${(props: any) => {
    const position = props['data-position'];

    switch (position) {
      case DayoPosition.LeftTop: {
        return css`
          left: 0;
          top: 0;
          flex-direction: column;
          align-items: flex-start;
        `;
      }
      case DayoPosition.RightTop: {
        return css`
          right: 0;
          top: 0;
          flex-direction: column;
          align-items: flex-end;
        `;
      }
      default:
      case DayoPosition.LeftBottom: {
        return css`
          left: 0;
          bottom: 0;
          flex-direction: column-reverse;
          align-items: flex-start;
        `;
      }
      case DayoPosition.RightBottom: {
        return css`
          right: 0;
          bottom: 0;
          flex-direction: column-reverse;
          align-items: flex-end;
        `;
      }
    }
  }}};
`;
