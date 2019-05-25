/**
 * impoort to able to use `Symbol.asyncIterator` because it is not supported on Edge etcc
 */
import 'core-js/es/symbol/async-iterator';
import React from 'react';
import {render, createPortal} from 'react-dom';
import styled from 'styled-components';
import {createDayo} from 'react-dayo';
// packages/react-dayo/src/mods/seed/presets/alerts/log.tsx
import log from 'react-dayo/mods/seed/presets/alerts/log';
// import warn from 'react-dayo/mods/seed/presets/alerts/warn';
// import error from 'react-dayo/mods/seed/presets/alerts/error';
// import success from 'react-dayo/mods/seed/presets/alerts/success';
// import unfriendly from 'react-dayo/mods/seed/presets/confirms/unfriendly';
console.log(createDayo);
console.log(log);

const [LeftTopAlertDayo, dispatchAtLeftTop] = createDayo();
const [RightBottomAlertDayo, dispatchAtRightBottom] = createDayo();

window.addEventListener(
  'error',
  (ev): void => {
    console.log(ev);
  },
);

const ButtonBlock = styled.aside`
  font-family: 'Lato', 'Noto Sans JP', '游ゴシック Medium', '游ゴシック体',
    'Yu Gothic Medium', YuGothic, 'ヒラギノ角ゴ ProN',
    'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック',
    'MS PGothic', sans-serif;
  position: fixed;
  left: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column;

  > section {
    margin-bottom: 0.89em;
  }

  > section > header > h5 {
    font-size: 1em;
    margin: 0.2em 0;
  }
`;

render(
  <div>
    <ButtonBlock>
      <section>
        <header>
          <h5>LEFT TOP</h5>
        </header>
        <button onClick={dispatchAtLeftTop(log.message('ログだよ'))}>
          log
        </button>
        <button onClick={dispatchAtLeftTop(success.message(`成功だよ`))}>
          success
        </button>
        <button onClick={dispatchAtLeftTop(warn.message('警告だよ'))}>
          warn
        </button>
        <button onClick={dispatchAtLeftTop(error.message(`エラーだよ`))}>
          error
        </button>
      </section>
      <section>
        <header>
          <h5>RIGHT BOTTOM</h5>
        </header>
        <button
          onClick={dispatchAtRightBottom(
            unfriendly.message(`確認だよ\n閉じていい？`).props({
              title: 'タイトル',
              confirm: 'はい',
              deny: 'いいえ',
            }),
          )}
        >
          confirm
        </button>
      </section>
    </ButtonBlock>
    {createPortal(<LeftTopAlertDayo maxLength={5} />, document.getElementById(
      'alert-left-top',
    ) as any)}
    {createPortal(
      <RightBottomAlertDayo maxLength={3} />,
      document.getElementById('alert-right-center') as any,
    )}
  </div>,
  document.getElementById('demo'),
);
