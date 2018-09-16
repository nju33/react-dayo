import React from 'react';
import {FunctionsContext, StateContext, DayoFunctions} from './contexts';
import {
  FiInfo,
  FiCheckCircle,
  FiBell,
  FiAlertCircle,
  FiHeart,
  FiHelpCircle,
  FiMessageCircle,
  FiRefreshCcw,
  FiTrash,
  FiStar,
  FiUpload,
  FiUser,
  FiPlay,
  FiMail,
  FiLink,
  FiBookmark,
  FiX,
  FiSettings,
} from 'react-icons/fi';
import {DayoPosition} from './dayo-position';
import {Holder} from './holder.atom';
import {Alert} from './alert.atom';
import {DayoType} from './dayo-type';
import {DayoCycle} from './dayo-cycle';

export interface DayoProps {
  position: DayoPosition;
}

export class Dayo extends React.Component<DayoProps> {
  static Position = DayoPosition;

  private onTransitionEnd = (
    functions: DayoFunctions,
    cycle: DayoCycle,
    itemId: string,
  ) => () => {
    if (cycle !== DayoCycle.Deleting) {
      return;
    }

    setTimeout(() => {
      functions.messageClear(itemId);
    }, 200);
  };

  private setHeight = (div: HTMLDivElement | null) => {
    if (div === null) {
      return;
    }

    console.log(div);
    div.style.height = `${div.clientHeight}px`;
  };

  private getIcon = (type: DayoType) => {
    switch (type) {
      default:
      case DayoType.Log: {
        return FiInfo;
      }
      case DayoType.Success: {
        return FiCheckCircle;
      }
      case DayoType.Warn: {
        return FiBell;
      }
      case DayoType.Error: {
        return FiAlertCircle;
      }
      case DayoType.Heart: {
        return FiHeart;
      }
      case DayoType.Help: {
        return FiHelpCircle;
      }
      case DayoType.Message: {
        return FiMessageCircle;
      }
      case DayoType.Refresh: {
        return FiRefreshCcw;
      }
      case DayoType.Setting: {
        return FiSettings;
      }
      case DayoType.Remove: {
        return FiTrash;
      }
      case DayoType.Star: {
        return FiStar;
      }
      case DayoType.Upload: {
        return FiUpload;
      }
      case DayoType.User: {
        return FiUser;
      }
      case DayoType.Play: {
        return FiPlay;
      }
      case DayoType.Mail: {
        return FiMail;
      }
      case DayoType.Link: {
        return FiLink;
      }
      case DayoType.Bookmark: {
        return FiBookmark;
      }
    }
  };

  render() {
    return (
      <FunctionsContext.Consumer>
        {functions => (
          <StateContext.Consumer>
            {state => {
              return (
                <Holder data-position={this.props.position}>
                  {state.store.map(item => {
                    const Icon = this.getIcon(item.type);

                    return (
                      <Alert
                        innerRef={this.setHeight}
                        key={item.id}
                        data-type={item.type}
                        data-cycle={item.cycle}
                        data-position={this.props.position}
                        onTransitionEnd={this.onTransitionEnd(
                          functions,
                          item.cycle,
                          item.id,
                        )}
                      >
                        <Icon />
                        {item.message} <FiX onClick={functions.hide(item.id)} />
                      </Alert>
                    );
                  })}
                </Holder>
              );
            }}
          </StateContext.Consumer>
        )}
      </FunctionsContext.Consumer>
    );
  }
}
