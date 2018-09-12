import React from 'react';
import {FunctionsContext, StateContext, DayoState} from './contexts';
import {Alert} from './alert.atom';
import {X} from './x.atom';

export class Dayo extends React.Component {
  onTransitionEnd = (state: DayoState) => () => {
    if (state.hidden) {
      return console.log(123);
    }

    return console.log(888);
  };

  render() {
    return (
      <FunctionsContext.Consumer>
        {({hide}) => (
          <StateContext.Consumer>
            {state => {
              return (
                <Alert
                  onTransitionEnd={this.onTransitionEnd(state)}
                  style={state.style}
                >
                  {state.message} <X onClick={hide} />
                </Alert>
              );
            }}
          </StateContext.Consumer>
        )}
      </FunctionsContext.Consumer>
    );
  }
}
