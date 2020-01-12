# Baracuda

A tiny (319B), modern and fast utility to make working with [hyperscript](https://github.com/hyperhype/hyperscript) easier

## Why?

Mostly code readability and DX. `h1('Hello world')` is easier to understand for me than `h('h1', {}, 'Hello world')`. It especially comes in handy when you have nested childrens.

```js
ul([li('First item'), li('Second item')]);
```

There was [other](https://github.com/ohanhi/hyperscript-helpers) [options](https://github.com/ungoldman/hyperaxe) but they seemed a little on the heavy side. I wanted something modern, slick, almost a "one liner".

## How?

[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). They are quite something.

## Installation

```bash
    npm install @amoutonbrady/baracuda
```

or

```bash
    yarn add @amoutonbrady/baracuda
```

## Usage

Import the `baracuda` factory function and wrap it around an `hyperscript` like function.

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

/!\ If the first argument is **not** an object, it will be interpreted as the `children` argument and defaulting the `attributes` to `{}`

## Example

_note: the library exports a default function and a name function_

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

You can find more example in the `tests` directory

## Limitations

This utility is based on an non polyfillable feature: Proxy. This can't be used in a non evergreen browser.

See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Browser_compatibility) for the full compatibility list. We only make use of the `handler.get` feature.

## Contributing

```bash
    git clone https://github.com/amoutonbrady/baracuda

    cd baracuda

    yarn install

    yarn build

    yarn test
```

## Roadmap

[_] Typescript support
[_] Add helpers, like classes, id

## Aknowledgment

-   [This issue](https://github.com/ohanhi/hyperscript-helpers/issues/26) that kind of started it all
-   [Hyperapp](https://github.com/jorgebucaran/hyperapp) which is the framework I had in mind while prototyping this
