const api = require("../infra/api")

class SendMessageToTeamsService {
  /**
   * @param {Object} model
   * @returns {Promise<void>}
   */
  async execute(model) {
    const webhookUrls = [
      "https://santandernet.webhook.office.com/webhookb2/1bf7b086-9b41-4a09-a0c6-b9d9eed777b4@35595a02-4d6d-44ac-99e1-f9ab4cd872db/IncomingWebhook/3c97e507f00a4af5956463b1dc888179/4e57a26f-d9f2-4677-941c-c8f236152338",
    ]
    
    await Promise.all(
      webhookUrls.map(async (webhookUrl) => {
        try {
          await api.post(webhookUrl, model)
        } catch (error) {
          console.info("Error on send message to teams", error)
        }
      })
    )
  }
}

module.exports = SendMessageToTeamsService
