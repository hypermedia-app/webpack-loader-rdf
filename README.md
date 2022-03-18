# webpack-loader-rdf [![Published on npm](https://img.shields.io/npm/v/webpack-loader-rdf.svg)](https://npm.im/webpack-loader-rdf)

RDF/JS parsers (and serializers) are quite heavy, only work asynchronously, and depend on various node-native modules, such as `stream` and `crypto`. This can be a nuisance when static RDF is imported early in an application becasue it unnecessarily increases the size of the initial bundle and thus slows down the initial page load.

A webpack loader reserializes RDF into JS code so that it can be bundled along all other sources.

## Usage

```
npm i -D webpack-loader-rdf
```

In `webpack.config.js`

```js
module.exports = {
  module: {
    rules: [{
      test: /\.(ttl|nt|nq|rdf|jsonld|trig)$/,
      use: 'webpack-loader-rdf',
    }],
  }
}
```

In code:

1. Import your favourire [RDF/JS DataFatory](http://rdf.js.org/data-model-spec/#datafactory-interface)
2. Default-import RDF module
3. Combine the two to get a `Quad[]`

```js
import * as $rdf from '@rdf-esm/data-model'
import getPersonQuads from './data/person.ttl`

const personQuads = getPersonQuads($rdf)
```

## In TypeScript

Declare this module, for example in a `global.d.ts`, to get types for Turtle imports

```typescript 
declare module '*.ttl' {
  import { Quad, DataFactory } from 'rdf-js'

  export default function (factory: DataFactory): Quad[]
}
```
