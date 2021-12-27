const { extensions } = require('rdf-utils-fs/defaults')
const { extname } = require('path')
const { parsers } = require('@rdfjs/formats-common')
const toStream = require('string-to-stream')
const Serializer = require('@rdfjs/serializer-rdfjs')

const serializer = new Serializer({
  module: 'esm'
})

function loader (source) {
  const callback = this.async()

  const extension = extname(this.resourcePath).split('.').pop()
  const mediaType = extensions[extension]

  Promise.resolve().then(async () => {
    const quadStream = parsers.import(mediaType, toStream(source))
    const module = serializer.import(quadStream)

    module.on('data', (code) => {
      callback(null, code)
    })
  })
}

module.exports = loader
