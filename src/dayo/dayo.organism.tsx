import React from 'react';
import {
  FunctionsContext,
  StateContext,
  DayoState,
  DayoFunctions,
} from './contexts';
import {Alert} from './alert.atom';
import {X} from './x.atom';

export class Dayo extends React.Component {
  onTransitionEnd = (functions: DayoFunctions) => (state: DayoState) => () => {
    if (state.hidden) {
      functions.messageClear();
      return;
    }
  };

  render() {
    return (
      <FunctionsContext.Consumer>
        {functions => (
          <StateContext.Consumer>
            {state => {
              return (
                <Alert
                  onTransitionEnd={this.onTransitionEnd(functions)(state)}
                  style={state.style}
                >
                  {state.message} <X onClick={functions.hide} />
                </Alert>
              );
            }}
          </StateContext.Consumer>
        )}
      </FunctionsContext.Consumer>
    );
  }
}
