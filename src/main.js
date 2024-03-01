const core = require('@actions/core')
const exec = require('@actions/exec')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const args = core.getInput('args', { required: true })

    core.debug(`Arguments: ${args}`)

    core.startGroup('Running cover')
    const commandLine = `dcover ${args}`
    await exec.exec(commandLine, [], { shell: true })
    core.endGroup()
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
