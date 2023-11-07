const fs = require("fs")

/**
 * @param {string} directoryPath
 * @returns {Promise<string[]>}
 */
function readDirectoryFiles(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, "utf-8", (error, files) => {
      if (error) {
        reject(error)
      }
      resolve(files)
    })
  })
}

module.exports = readDirectoryFiles

