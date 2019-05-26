# React Dayo

[![github](https://badgen.net/badge//nju33,react-dayo/000?icon=github&list=1)](https://github.com/nju33/react-dayo)
[![npm:version](https://badgen.net/npm/v/react-dayo?icon=npm&label=)](https://www.npmjs.com/package/react-dayo)
[![typescript](https://badgen.net/badge/lang/typescript/0376c6)](https://www.typescriptlang.org/)
[![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--react-dayo.netlify.com/)
[![license](https://badgen.net/npm/license/react-dayo)](https://github.com/nju33/react-dayo/blob/master/LICENSE)
[![code style: prettier](https://badgen.net/badge//prettier/ff69b3?label=code%20style)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

<!-- [![ci:status](https://badgen.net/circleci/github/nju33/react-dayo)](https://circleci.com/gh/nju33/react-dayo) -->

## Usage

````ts
/**
 * To prepare of using the `react-dayo` which dependencied `react@^16.8.0` and `@types/react`
 * And you will need `react-dom` and `@types/react-dom` too
 *
 * ```sh
 * yarn add react-dayo react @types/react react-dom react @types/react-dom
 * ```
 */
import {createDayo} from 'react-dayo';
/**
 * To import presets for example the `log`.
 * Also in that case, Your project is required `styled-components@^4.2.0` and `@types/styled-components`
 *
 * ```sh
 * yarn add styled-components @types/styled-components
 * ```
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

[![Edit @react-dayo/example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nju33/react-dayo/tree/example/?fontsize=14)

## Creat custom seed

todo
