const ReadCucumberFileService = require("./ReadCucumberFileService")
const path = require("path")
const readDirectoryFiles = require("../utils/ReadDirectoryFiles")

class GetCypressResumeService {


  /**
   * @param {string} cucumberDirectory
   */
  async execute(cucumberDirectory) {


    let numberOfFailedTests = 0
    let numberOfPassedTests = 0

    const directoryFiles = await readDirectoryFiles(cucumberDirectory)

    const filesFiltered = directoryFiles.filter(file => file.includes(".cucumber.json"))

    for await (const file of filesFiltered) {
      const readCucumberFileService = new ReadCucumberFileService()

      const cucumberFilePath = path.resolve(cucumberDirectory, file)

      const cucumberFile = await readCucumberFileService.execute(cucumberFilePath)

      const cucumberReports = JSON.parse(cucumberFile)

      cucumberReports.forEach(cucumberReport => {
        const { elements: cucumberElements } = cucumberReport

        cucumberElements.forEach(cucumberElement => {
          const { steps: cucumberElementSteps } = cucumberElement



          cucumberElementSteps.forEach(cucumberElementStep => {
            const { status: stepResult } = cucumberElementStep.result

            if (stepResult === 'failed') {
              numberOfFailedTests += 1
            }

          });

          if (cucumberElementSteps.every (({result}) => result.status.includes('passed'))) {
            numberOfPassedTests += 1
          }

        });
      });
    }

    const finalStatus = numberOfFailedTests === 0 ? 'PASSED' : 'FAILED'

    return { numberOfFailedTests, numberOfPassedTests, finalStatus }
  }
}

module.exports = GetCypressResumeService
