const fs = require("fs")

class ReadCucumberFileService {
  /**
   * @param {string} file
   * @returns {Promise<string>} 
   */
  async execute(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf-8', (error, data) => {
        if (error) {
          reject(error)
        }
        resolve(data)
      })
    })
  }
}

module.exports = ReadCucumberFileService