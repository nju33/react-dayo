import React from 'react';
import {render} from 'react-dom';
import {DayoProvider, Dayo, DayoFunctionsConsumer} from './src';

// console.log(Dayo, DayoFunctionsConsumer);

const div = document.createElement('div');
document.body.appendChild(div);

render(
  <div>
    <DayoProvider theme={{color: 'pink'}}>
      <DayoFunctionsConsumer>
        {({show}) => {
          return (
            <>
              {/* tslint:disable-next-line:react-this-binding-issue */}
              <button onClick={show('alksdfasf')}>show</button>
              <Dayo />
            </>
          );
        }}
      </DayoFunctionsConsumer>
    </DayoProvider>
  </div>,
  div,
);
