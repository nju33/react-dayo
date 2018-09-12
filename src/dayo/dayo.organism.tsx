import React from 'react';
import {FunctionsContext, StateContext} from './contexts';
import {Alert} from './alert.atom';

export class Dayo extends React.Component {
  render() {
    return (
      <FunctionsContext.Consumer>
        {({hide}) => (
          <StateContext.Consumer>
            {state => (
              <Alert style={state.style}>
                {state.message} <button onClick={hide}>x</button>
              </Alert>
            )}
          </StateContext.Consumer>
        )}
      </FunctionsContext.Consumer>
    );
  }
}
