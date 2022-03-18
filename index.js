const { extensions } = require('rdf-utils-fs/defaults')
const { extname } = require('path')
const { parsers } = require('@rdfjs/formats-common')
const toStream = require('string-to-stream')

function loader (source) {
  const callback = this.async()

  const extension = extname(this.resourcePath).split('.').pop()
  const mediaType = extensions[extension]

  Promise.resolve().then(async () => {
    const Serializer = (await import('@rdfjs/serializer-rdfjs')).default
    const serializer = new Serializer({
      module: 'esm'
    })

    const quadStream = parsers.import(mediaType, toStream(source))
    const module = serializer.import(quadStream)

    module.on('data', (code) => {
      callback(null, code)
    })
  })
}

module.exports = loader
