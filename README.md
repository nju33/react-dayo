# React Dayo

A Queue component for notification etc.

[![github](https://badgen.net/badge/github/nju33,react-dayo/000?icon=github&list=1)](https://github.com/nju33/react-dayo)
[![npm:version](https://badgen.net/npm/v/react-dayo?icon=npm&label=)](https://www.npmjs.com/package/react-dayo)
[![typescript](https://badgen.net/badge/language/typescript/0376c6?icon=typescript)](https://www.typescriptlang.org/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![ci:status](https://badgen.net/circleci/github/nju33/react-dayo/master)](https://circleci.com/gh/nju33/react-dayo)
[![Coverage Status](https://coveralls.io/repos/github/nju33/react-dayo/badge.svg?branch=v0.2.2)](https://coveralls.io/github/nju33/react-dayo?branch=master)
[![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--react-dayo.netlify.com/)
[![license](https://badgen.net/npm/license/react-dayo)](https://github.com/nju33/react-dayo/blob/master/LICENSE)
[![code style: prettier](https://badgen.net/badge/code%20style/prettier/ff69b3)](https://github.com/prettier/prettier)


## Usage

````ts
/**
 * To prepare of using the `react-dayo`.
 * It requires `react@^16.8.0`, `@types/react`, `styled-components@^4.2.0` and `@types/styled-components`.
 * And you will need `react-dom` and `@types/react-dom` too
 *
 * ```sh
 * yarn add react-dayo react @types/react react-dom react @types/react-dom styled-components @types/styled-components
 * ```
 */
import {createDayo} from 'react-dayo';
/**
 * If you intent to use `log` which is one of the preset.
 * You also write the following like.
 */
import log from 'react-dayo/dist/main/mods/seed/presets/alerts/log';
````

The Directory structure is looked at [here](https://unpkg.com/react-dayo/).

## Example

First write the markup.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- omit -->
  </head>
  <body>
    <div id="app"><!-- For to mount your react app --></div>
    <div id="dayobox">
      <!-- For to mount <Dayo /> in here with `ReactDom.createPortal` -->
    </div>
  </body>
</html>
```

```jsx
const [Dayo, dispatch] = createDayo();

ReactDom.render(
  (
    <div>
      {/* ...nest... */}

      <div>
        <button onClick={dispatch(log.message('Hello by Dayo'))}>button</button>
      </div>

      {ReactDom.createPortal(<Dayo />, document.getElementById('dayobox'))}

      {/* ...nest... */}
    </div>
  )
  document.getElementById('app')
)
```

[![Edit @example/react-dayo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nju33/react-dayo/tree/%40example%2Freact-dayo/?fontsize=14)

## Creat custom seed

todo

## Archive

- [@0.1.4](https://nju33.github.io/react-dayo/)

[![BrowserStack](./fixtures/Browserstack-logo@2x.png)](https://www.browserstack.com)
