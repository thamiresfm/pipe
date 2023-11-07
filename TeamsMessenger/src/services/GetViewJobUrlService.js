/**
 * @typedef { Object } IResponse
 * @property { String } viewJobUrl
 * @property { String } environmentName
 * @property { String } automationTitle
 */

class GetViewJobUrlService {


  /**
   * @return { IResponse }
   */
  execute() {

    const environmentName = process.env.RELEASE_ENVIRONMENTNAME;
    const buildId = process.env.BUILD_ID
    const moduleName = process.env.MODULE_NAME
    const automationTitle = process.env.AUTOMATION_TITLE
    const viewJobUrl = `https://dev.azure.com/albatross-getnet/${encodeURIComponent(moduleName)}/_build/results?buildId=${buildId}&view=JakubRumpca.azure-pipelines-html-report.build-html-report-tab`

    return {
      viewJobUrl,
      environmentName,
      automationTitle
    }
  }
}

module.exports = GetViewJobUrlService
