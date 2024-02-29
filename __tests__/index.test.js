/**
 * Unit tests for the action's entrypoint, src/index.js
 */

const { run } = require('../src/install/main')

// Mock the action's entrypoint
jest.mock('../src/install/main', () => ({
  run: jest.fn()
}))

describe('index', () => {
  it('calls run when imported', async () => {
    require('../src/install/index')

    expect(run).toHaveBeenCalled()
  })
})
