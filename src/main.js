const core = require('@actions/core')
const exec = require('@actions/exec')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const args = core.getInput('ARGS', { required: true })

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Arguments: ${args}`)

    core.startGroup('Running cover')
    await exec.exec('dcover', [args])
    core.endGroup()
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
