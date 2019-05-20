import React from 'react';
import {render} from 'react-dom';
// import {DayoProvider, Dayo, DayoFunctionsConsumer} from './src';
import log from './src/mods/alert/presets/log';
import {createDayo} from './src/mods/dayo/dayo';

const div = document.getElementById('demo');

const [Dayo, dispatch] = createDayo();

render(
  <div>
    <Dayo>
      <button onClick={dispatch(log)}>button</button>
    </Dayo>
  </div>,
  document.getElementById('demo'),
);
