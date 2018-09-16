import React from 'react';
import {ThemeProvider} from 'styled-components';
import nanoid from 'nanoid';
import {FunctionsContext, StateContext, DayoState, DayoItem} from './contexts';
import {DayoType} from './dayo-type';
import {DayoCycle} from './dayo-cycle';

export interface DayoTheme {
  fontSize?: string;
  borderRadius?: string;
  transition?: string;
}
export class DayoProvider extends React.Component<
  {theme: DayoTheme},
  DayoState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      store: [],
    };
  }

  private callPreventDefault(ev?: React.MouseEvent<unknown>) {
    if (ev !== undefined) {
      ev.preventDefault();
    }
  }

  private maybeTruncateItem = (store: DayoItem[]) => {
    if (store.length <= 3) {
      return;
    }

    const target = this.state.store.find(
      item => item.cycle === DayoCycle.Created,
    );
    if (target !== undefined) {
      this.hide(target.id)();
    }
  };

  private show = (type: DayoType, message: string) => {
    const item = {
      id: nanoid(),
      type,
      message,
      cycle: DayoCycle.Creating,
    };

    // 3 つ以上溜まっていたら古いものを削除
    this.maybeTruncateItem(this.state.store);

    this.setState({
      store: [...this.state.store, item],
    });

    // css の transition を効かせるために少しズラす
    setTimeout(() => {
      item.cycle = DayoCycle.Created;
      this.forceUpdate();
    }, 50);
  };

  log = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Log, message);
  };

  success = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Success, message);
  };

  warn = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Warn, message);
  };

  error = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Error, message);
  };

  heart = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Heart, message);
  };

  help = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Help, message);
  };

  message = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Message, message);
  };

  refresh = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Refresh, message);
  };

  setting = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Setting, message);
  };

  remove = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Remove, message);
  };

  star = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Star, message);
  };

  upload = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Upload, message);
  };

  user = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.User, message);
  };

  play = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Play, message);
  };

  mail = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Mail, message);
  };

  link = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Link, message);
  };

  bookmark = (message: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    this.show(DayoType.Bookmark, message);
  };

  hide = (itemId: string) => (ev?: React.MouseEvent<unknown>) => {
    this.callPreventDefault(ev);

    // const messages = [...this.state.messages];
    // messages.splice(styleIndex, 1);
    const target = this.state.store.find(item => item.id === itemId);
    if (target === undefined) {
      return;
    }

    target.cycle = DayoCycle.Deleting;
    this.forceUpdate();
  };

  messageClear = (itemId: string) => {
    const store = [...this.state.store];
    const index = store.findIndex(item => item.id === itemId);
    if (index === -1) {
      return;
    }
    store.splice(index, 1);
    this.setState({store});
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <FunctionsContext.Provider
          value={{
            log: this.log,
            success: this.success,
            warn: this.warn,
            error: this.error,
            heart: this.heart,
            help: this.help,
            message: this.message,
            refresh: this.refresh,
            setting: this.setting,
            remove: this.remove,
            star: this.star,
            upload: this.upload,
            user: this.user,
            play: this.play,
            mail: this.mail,
            link: this.link,
            bookmark: this.bookmark,
            hide: this.hide,
            messageClear: this.messageClear,
          }}
        >
          <StateContext.Provider value={this.state}>
            {this.props.children}
          </StateContext.Provider>
        </FunctionsContext.Provider>
      </ThemeProvider>
    );
  }
}
