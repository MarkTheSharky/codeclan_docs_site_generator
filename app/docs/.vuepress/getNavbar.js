const fs = require("fs");
const formatFolderName = require('./utilities/formatFolderName')

module.exports = function makeNavbar(path) {
    const fileArray = [];

    fs.readdirSync(path).forEach(file => {

      const stat = fs.statSync(`${path}/${file}`)

      const fileInfo = {
        text: formatFolderName(file, false),
        link: ''
      }
      
      // Handle if directory
      if (stat.isDirectory()) {
        const newPath = path.substring(path.indexOf('/'))
        fileInfo.link = `${newPath}/${file}`
        fileArray.push(fileInfo)
      }
    })

    return fileArray;
}