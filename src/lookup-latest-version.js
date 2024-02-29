const core = require('@actions/core')
const { HttpClient } = require('@actions/http-client')

async function lookupLatestVersion() {
  const latestUrl = 'https://release.diffblue.com/cli/latest'
  core.info(`Checking ${latestUrl}`)

  const client = new HttpClient('diffblue/cover-github-action', [], {
    allowRedirects: false
  })
  const response = await client.get(latestUrl)

  const status = response.message.statusCode || 0
  if (status < 300 || status > 399) {
    throw new Error(
      `Expected 3xx response but found ${response.message.statusCode}`
    )
  }

  const redirectUrl = response.message.headers['location']
  if (!redirectUrl) {
    throw new Error('Expected redirect location but found none')
  }

  const regex = /^.*\/(\D+)-(\d.+)\.zip$/
  const groups = regex.exec(redirectUrl)
  if (!groups) {
    throw new Error(`Expected parseable url but found ${redirectUrl}`)
  }

  return {
    name: groups[1],
    version: groups[2],
    url: redirectUrl
  }
}

module.exports = { lookupLatestVersion }
