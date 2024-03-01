const core = require('@actions/core')
const io = require('@actions/io')
const tool = require('@actions/tool-cache')

const { lookupLatestVersion } = require('./lookup-latest-version')

async function installLatestVersion() {
  const { name, version, url } = await lookupLatestVersion()

  let installation = tool.find(name, version)
  if (installation === '') {
    core.info(`Downloading ${url}`)
    const file = await tool.downloadTool(url)
    const dir = await tool.extractZip(file)
    installation = await tool.cacheDir(dir, name, version)

    await io.rmRF(file)
    await io.rmRF(dir)
  }

  core.addPath(installation)
}

module.exports = { installLatestVersion }
