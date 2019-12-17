const glob = require('glob-all')

describe('Checking generated html files', () => {
  it ('should generate css js files', done => {
    const files = glob.sync([
      './dist/index_*css',
      './dist/index_*.js'
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('no css js files generated')
    }
  })
})