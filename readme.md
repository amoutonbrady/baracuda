[![codecov](https://codecov.io/gh/amoutonbrady/baracuda/branch/master/graph/badge.svg)](https://codecov.io/gh/amoutonbrady/baracuda)

# Baracuda

A tiny (400B), modern and fast utility around [hyperscript](https://github.com/hyperhype/hyperscript) like view layer easier

## Why?

Mostly code readability and DX. `h1('Hello world')` is easier to understand (for me that is) than `h('h1', {}, 'Hello world')`. It comes in handy when you have nested childrens.

```js
ul([li('First item'), li('Second item')]);
```

There was [other](https://github.com/ohanhi/hyperscript-helpers) [options](https://github.com/ungoldman/hyperaxe) but they seemed a little on the heavy side. I wanted something modern and slick.

## How?

[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## Installation

```bash
npm install @amoutonbrady/baracuda
or
yarn add @amoutonbrady/baracuda
```

## Usage

Import the `baracuda` factory function and wrap it around an `hyperscript` like function.

According to tests, `baracuda` should be compatible with the following frameworks:

-   Vue 3: `import { h } from 'vue'`
-   Hyperapp: `import { h } from 'hyperapp'`
-   Preact: `import { h } from 'preact'`
-   Inferno: `import { h } from 'inferno-hyperscript'`

You can find more example in the `tests` directory

The `hyperscript` like function has to take **3 arguments** :

```ts
h(tag: string, attributes: Object, childrens: string | Element | Element[])
```

The return object from `baracuda` is a Proxy that can be destructed into functions with the following interface:

```ts
fn(attributes: Object, childrens: string | Element | Element[]): Element
fn(childrens: string | Element | Element[]): Element
```

Where:

-   `fn` is the name of the tag (eg: `div`, `h1`, etc.)
-   `attributes` is an object containing dom attributes (eg: classes, event handler, etc.)
-   `childrens` is either a string or an array of `Element`

⚠️ If the first argument is **not** an object, it will be interpreted as the `childrens` argument and defaulting the `attributes` to `{}`

## Example

_note: the library exports a default function as well as a named function_

#### Quick example

```
import { h, render } from 'my-dom-library';
import { baracuda } from '@amoutonbrady/baracuda';
// import hh from '@amoutonbrady/baracuda'; <= That also works

const { ul, li } = baracuda(h);

const app = ul([
    li(1),
    li(2),
]);

render(app, document.body);
```

#### Live example

-   [Adapting the official Hyperapp V2 example using Baracuda](https://codesandbox.io/s/hyperapp-baracuda-example-e5ful)

## Limitations

This utility is based on an non polyfillable feature: Proxy. This can't be used in a non evergreen browser.

See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Browser_compatibility) for the full compatibility list. I only use the `handler.get` feature.

Mithril is only partially compatible for the moment.

## Contributing

```bash
git clone https://github.com/amoutonbrady/baracuda

cd baracuda

yarn install

yarn build

yarn test
```

## Roadmap

-   [x] ~Typescript support~ Better Typescript support
-   [ ] Add helpers, like classes, id
-   [ ] More tests

## Aknowledgment

-   [This issue](https://github.com/ohanhi/hyperscript-helpers/issues/26) started it all
-   [Hyperapp](https://github.com/jorgebucaran/hyperapp) which is the framework I had in mind while prototyping this
