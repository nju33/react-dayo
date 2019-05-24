import React from 'react';
import {render, createPortal} from 'react-dom';
import log from './src/mods/seed/presets/alerts/log';
import warn from './src/mods/seed/presets/alerts/warn';
import error from './src/mods/seed/presets/alerts/error';
import success from './src/mods/seed/presets/alerts/success';
import unfriendly from './src/mods/seed/presets/confirms/unfriendly';
import {createDayo} from './src';

const [Dayo, dispatch] = createDayo();
const [Dayo2, dispatch2] = createDayo({to: 'bottom'});

window.addEventListener(
  'error',
  (ev): void => {
    console.log(ev);
  },
);

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
      <button onClick={dispatch2(success.message(`成功だよ`))}>success</button>
      <button
        onClick={dispatch2(
          unfriendly.message(`確認だよ\n閉じていい？`).props({
            title: 'タイトル',
            confirm: 'はい',
            deny: 'いいえ',
          }),
        )}
      >
        confirm
      </button>
    </div>
    {createPortal(<Dayo />, document.getElementById('alert-left-top') as any)}
    {createPortal(<Dayo2 />, document.getElementById(
      'alert-right-center',
    ) as any)}
  </div>,
  document.getElementById('demo'),
);
