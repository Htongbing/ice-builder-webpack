const assert = require('assert')

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')

  it ('entry', () => {
    assert.equal(baseConfig.entry.index.inclues('/test/smoke/template/src/pages/index/index.js'), true)
  })
})