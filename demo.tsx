import React from 'react';
import {render} from 'react-dom';
import {DayoProvider, Dayo, DayoFunctionsConsumer} from './src';

const div = document.getElementById('demo');

render(
  <div>
    <DayoProvider theme={{}}>
      <DayoFunctionsConsumer>
        {({
          log,
          success,
          warn,
          error,
          heart,
          help,
          message,
          refresh,
          setting,
          remove,
          star,
          upload,
          user,
          play,
          mail,
          link,
          bookmark,
        }) => {
          return (
            <>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: '300px',
                  margin: '10em auto',
                }}
              >
                <button onClick={log('ログだよ')}>log</button>
                <button onClick={success('サクセスだよ')}>success</button>
                <button onClick={warn('ワーンだよ')}>warn</button>
                <button onClick={error('エラーだよ')}>error</button>
                <button onClick={heart('ハートだよ')}>heart</button>
                <button onClick={help('ヘルプだよ')}>help</button>
                <button onClick={message('メッセージだよ')}>message</button>
                <button onClick={refresh('リフレッシュだよ')}>refresh</button>
                <button onClick={setting('セッティングだよ')}>setting</button>
                <button onClick={remove('リムーブだよ')}>remove</button>
                <button onClick={star('スターだよ')}>star</button>
                <button onClick={upload('アップロードだよ')}>upload</button>
                <button onClick={user('ユーザーだよ')}>user</button>
                <button onClick={play('プレイだよ')}>play</button>
                <button onClick={mail('メールだよ')}>mail</button>
                <button onClick={link('リンクだよ')}>link</button>
                <button onClick={bookmark('ブックマークだよ')}>bookmark</button>
              </div>
              <Dayo position={Dayo.Position.LeftTop} />
              <Dayo position={Dayo.Position.RightTop} />
              <Dayo position={Dayo.Position.LeftBottom} />
              <Dayo position={Dayo.Position.RightBottom} />
            </>
          );
        }}
      </DayoFunctionsConsumer>
    </DayoProvider>
  </div>,
  div,
);
