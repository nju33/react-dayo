import React from 'react';
import {render} from 'react-dom';
import log from './src/mods/seed/presets/log';
import {createDayo} from './src/mods/dayo/dayo';

const [Dayo, dispatch] = createDayo();

render(
  <div>
    <div
      style={{
        position: 'fixed',
        right: 10,
        bottom: 10,
      }}
    >
      <button onClick={dispatch(log.message('ログだよ'))}>log</button>
      <button onClick={dispatch(log.message('ログ2だよ'))}>log2</button>
    </div>
    <Dayo />
  </div>,
  document.getElementById('demo'),
);
