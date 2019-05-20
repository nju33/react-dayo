import styled, {css} from 'styled-components';
import {getLuminance, darken, lighten} from 'polished';
import {DayoPosition} from './dayo-position';
import {DayoType} from './dayo-type';
import {DayoCycle} from './dayo-cycle';

const ASAGI = '#33a6b8';
const YANAGIZOME = '#91ad70';
const SHAREGAKI = '#ffba84';
const USUBENI = '#e87a90';
const KURENAI = '#cb1b45';
const SHIRONERI = '#fcfaf2';
const KESHIZUMI = '#434343';
const KANZO = '#fc9f4d';
const NIBI = '#656765';
const MURASAKITOBI = '#60373e';
const TAMAGO = '#f9bf45';
const SANGOSYU = '#f17c67';
const KURUMI = '#947a6d';
const NAE = '#86c166';
const BENIFUJI = '#b481bb';
const SORA = '#58b2dc';
const RURI = '#005caf';

const getType = (props: {'data-type': DayoType}) => {
  return props['data-type'];
};

// tslint:disable-next-line:no-unused
type FirstArg<T> = T extends (arg: infer A) => any ? A : never;

const getColorByType = (adjustFn = (color: string) => color) => (
  props: FirstArg<typeof getType>,
) => {
  const type = getType(props);

  switch (type) {
    default:
      return adjustFn('#333');
    case DayoType.Log: {
      return adjustFn(ASAGI);
    }

    case DayoType.Success: {
      return adjustFn(YANAGIZOME);
    }

    case DayoType.Warn: {
      return adjustFn(SHAREGAKI);
    }

    case DayoType.Error: {
      return adjustFn(USUBENI);
    }

    case DayoType.Heart: {
      return adjustFn(KURENAI);
    }

    case DayoType.Help: {
      return adjustFn(SHIRONERI);
    }

    case DayoType.Message: {
      return adjustFn(KESHIZUMI);
    }

    case DayoType.Refresh: {
      return adjustFn(KANZO);
    }

    case DayoType.Setting: {
      return adjustFn(NIBI);
    }

    case DayoType.Remove: {
      return adjustFn(MURASAKITOBI);
    }

    case DayoType.Star: {
      return adjustFn(TAMAGO);
    }

    case DayoType.Upload: {
      return adjustFn(SANGOSYU);
    }

    case DayoType.User: {
      return adjustFn(KURUMI);
    }

    case DayoType.Play: {
      return adjustFn(NAE);
    }

    case DayoType.Mail: {
      return adjustFn(BENIFUJI);
    }

    case DayoType.Link: {
      return adjustFn(SORA);
    }

    case DayoType.Bookmark: {
      return adjustFn(RURI);
    }
  }
};

export const Alert = styled.div`
  /* background: ${props => props.theme.color || '#bc002e'}; */
  /* color: ${props => {
    if (getLuminance(props.theme.color || '#bc002e') > 0.5) {
      return '#000';
    }

    return '#fff';
  }}; */
  /* transition: 0.4s
    ${props =>
      props.theme.transition || 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'},
    color .4s .2s; */
  font-size: ${props => props.theme.fontSize || '14px'};
  border-radius: ${props => props.theme.borderRadius || 0};
  display: inline-flex;
  align-items: center;
  padding: 0.1em 0.4em;
  white-space: pre;
  position: relative;
  user-select: none;
  color: transparent;

  margin-bottom: 4px;

  /* border-radius: 2px; */
  background-color: ${getColorByType()};
  border: 1px solid;
  border-color: ${getColorByType(darken.bind(null, 0.15))};

  ${(attrs: any) => {
    const color = getColorByType()(attrs);
    const position = attrs['data-position'];
    const cycle = attrs['data-cycle'];

    switch (cycle) {
      case DayoCycle.Creating: {
        return css`
          transition: 0.4s
              ${(props: any) =>
                props.theme.transition ||
                'cubic-bezier(0.68, -0.55, 0.265, 1.55)'},
            color 0.3s 0.2s;
          right: ${(() => {
            if (
              [DayoPosition.LeftTop, DayoPosition.LeftBottom].indexOf(
                position,
              ) > -1
            ) {
              return '-30%';
            }

            return '30%';
          })()}
          opacity: 0;
          transform: scale(0.8);
        `;
      }

      case DayoCycle.Created: {
        return css`
          transition: 0.4s
              ${(props: any) =>
                props.theme.transition ||
                'cubic-bezier(0.68, -0.55, 0.265, 1.55)'},
            color 0.3s 0.2s;
          right: 0%;
          opacity: 1;
          transform: scale(1);
          color: ${() => {
            if (getLuminance(color) > 0.5) {
              return getColorByType(darken.bind(null, 0.5));
            }

            return getColorByType(lighten.bind(null, 0.5));
          }};
        `;
      }

      case DayoCycle.Deleting: {
        return css`
          transition: 0.4s
              ${props =>
                props.theme.transition ||
                'cubic-bezier(0.68, -0.55, 0.265, 1.55)'}
              0.1s,
            color 0.2s;
          right: 0%;
          padding: 0;
          margin-top: 0;
          margin-bottom: 0;
          border: none;
          height: 0px !important;
          overflow: hidden;
          opacity: 0;
          transform: scale(1);
          color: transparent;
        `;
      }

      default: {
        return '';
      }
    }
  }};

  /* icon by type */
  & svg:first-child {
    transform: scale(.8);
    margin-right: .3em;
  }

  /* close icon */
  & svg:last-child {
    transition: 0.5s ${(props: any) =>
      props.theme.transition || 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'};
    transform: scale(.69);
    margin-left: .3em;
    cursor: pointer;
    opacity: 0.6;
  }

  & svg:last-child:hover {
    transform: scale(1);
    opacity: 1;
  }
`;
