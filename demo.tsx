import React from 'react';
import {render, createPortal} from 'react-dom';
import log from './src/mods/seed/presets/log';
import warn from './src/mods/seed/presets/warn';
import error from './src/mods/seed/presets/error';
import {createDayo} from './src';

const [Dayo, dispatch] = createDayo();
const [Dayo2, dispatch2] = createDayo({to: 'bottom'});

window.addEventListener(
  'error',
  (ev): void => {
    console.log(ev);
  },
);

console.log(log, error);

render(
  <div>
    <div
      style={{
        position: 'fixed',
        left: 10,
        bottom: 10,
      }}
    >
      <button onClick={dispatch(log.message('ログだよ'))}>log</button>
      <button onClick={dispatch(log.message('ログ2だよ'))}>log2</button>
      <button onClick={dispatch2(log.message('ログ2だよ'))}>log2</button>
      <button onClick={dispatch(warn.message('警告だよ'))}>warn</button>
      <button onClick={dispatch(error.message(`エラーだよ${Math.random()}`))}>
        error
      </button>
    </div>
    {createPortal(<Dayo />, document.getElementById('alert-left-top') as any)}
    {createPortal(<Dayo2 />, document.getElementById(
      'alert-right-center',
    ) as any)}
  </div>,
  document.getElementById('demo'),
);
