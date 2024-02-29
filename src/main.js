const core = require('@actions/core')
const { wait } = require('./wait')
const { lookupLatestVersion } = require('./lookup-latest-version')
const { installLatestVersion } = require('./install-latest-version')
const exec = require('@actions/exec')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const ms = core.getInput('milliseconds', { required: true })

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`)

    const { name, version, url } = await lookupLatestVersion()
    core.debug(`We get name=${name} version=${version} url=${url}`)

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())

    core.startGroup('Install')
    await installLatestVersion()
    await exec.exec('dcover', ['--version'])
    core.endGroup()
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
