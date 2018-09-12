import React from 'react';
import {ThemeProvider} from 'styled-components';
import {FunctionsContext, StateContext, DayoState} from './contexts';

export interface DayoTheme {
  color: string;
}

export class DayoProvider extends React.Component<
  {theme: DayoTheme},
  DayoState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      message: null,
      hidden: false,
      style: {
        position: 'absolute',
        left: '10px',
        top: '-30px',
      },
    };
  }

  show = (message: string) => {
    this.setState({
      message,
      hidden: false,
      style: {
        position: 'absolute',
        left: '10px',
        top: '30px',
      },
    });
  };

  hide = () => {
    this.setState({
      message: null,
      hidden: true,
      style: {
        position: 'absolute',
        left: '10px',
        top: '-30px',
      },
    });
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <FunctionsContext.Provider
          value={{
            show: this.show,
            hide: this.hide,
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
