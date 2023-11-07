const { default: axios } = require("axios")

const api = axios.create({
  baseURL: "https://santandernet.webhook.office.com/"
})

module.exports = api