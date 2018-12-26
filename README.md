# React Dayo

[![github](https://badgen.net/badge//nju33,react-dayo/000?icon=github&list=1)](https://github.com/nju33/react-dayo)
[![npm:version](https://badgen.net/npm/v/react-dayo?icon=npm&label=)](https://www.npmjs.com/package/react-dayo)
[![typescript](https://badgen.net/badge/lang/typescript/0376c6?icon=npm)](https://www.typescriptlang.org/)
[![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--react-dayo.netlify.com/)
[![license](https://badgen.net/npm/license/react-dayo)](https://github.com/nju33/react-dayo/blob/master/LICENSE)
[![browserslist](https://badgen.net/badge/browserslist/chrome,edge/ffd539?list=1)](https://browserl.ist/?q=last+1+chrome+version%2C+last+1+edge+version)
[![code style: prettier](https://badgen.net/badge//prettier/ff69b3?label=code%20style)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

<!-- [![ci:status](https://badgen.net/circleci/github/nju33/react-dayo)](https://circleci.com/gh/nju33/react-dayo) -->

## Usage 

```ts
/**
 * As to prepare of using the `Dayo`
 * 
 * ```sh
 * yarn add react-dayo react @types/react styled-components @types/styled-components 
 * ```
 */
import {DayoProvider, DayoFunctionsConsumer, Dayo} from 'react-dayo';
```

## Example

```jsx
() => (
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
)
```

The actual example of above is [https://nju33.github.io/react-dayo/](https://nju33.github.io/react-dayo/).
