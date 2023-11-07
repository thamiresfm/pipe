const path = require("path")
const SendCucumberReportToTeamsService = require("./services/SendCucumberReportToTeamsService")

const cucumberDirectory = path.resolve("..", "cypress", "cucumber-json")

const sendCucumberReportToTeamsService = new SendCucumberReportToTeamsService()
sendCucumberReportToTeamsService.execute(cucumberDirectory)
