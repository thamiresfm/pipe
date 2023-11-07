const GetCypressResumeService = require("./GetCypressResumeService")
const SendMessageToTeamsService = require("./SendMessageToTeamsService")
const GetViewJobUrlService = require("./GetViewJobUrlService")
class SendCucumberReportToTeamsService {
  /**
   * @param {string} cucumberDirectory
   */
  async execute(cucumberDirectory) {

    const getCypressResumeService = new GetCypressResumeService()
    const { numberOfFailedTests, numberOfPassedTests, finalStatus } = await getCypressResumeService.execute(cucumberDirectory)

    const getViewJobUrlService = new GetViewJobUrlService()

    const { viewJobUrl, environmentName } = getViewJobUrlService.execute()

    const messageBody = {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "0076D7",
      "summary": "Automated Testings - Newman",
      "sections": [
        {
          "activityTitle": "Card Interchange",
          "activitySubtitle": environmentName,
          "activityImage": "https://cdn.pixabay.com/photo/2017/10/24/00/39/bot-icon-2883144_1280.png",
          "facts": [
            {
              "name": "Status",
              "value": finalStatus
            },
            {
              "name": "View Job",
              "value": `[Report Details](${viewJobUrl})`
            },
            {
              "name": "Number of passed tests",
              "value": numberOfPassedTests
            },
            {
              "name": "Number of failed tests",
              "value": numberOfFailedTests
            },
          ],
          "markdown": true
        }
      ]
    }

    const sendMessageToTeamsService = new SendMessageToTeamsService(cucumberDirectory)

    await sendMessageToTeamsService.execute(messageBody)

  }
}

module.exports = SendCucumberReportToTeamsService
