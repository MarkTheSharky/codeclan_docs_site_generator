const fs = require("fs");
const formatFolderName = require('./utilities/formatFolderName')

module.exports = function makeNavbar(path) {
    const fileArray = [];

    fs.readdirSync(path).forEach(file => {

      const stat = fs.statSync(`${path}/${file}`)

      const fileInfo = {
        text: formatFolderName(file),
        link: ''
      }
      
      // Handle if directory
      if (path === 'docs/codeclan' && stat.isDirectory()) {
        const newPath = path.substring(path.indexOf('/'))
        fileInfo.link = `${newPath}/${file}/`
        fileArray.push(fileInfo)
      } else if (path === 'docs/cheatsheets') {
        const newPath = path.substring(path.indexOf('/'))
        fileInfo.link = `${newPath}/${file}/${file}_cheatsheet.md`
        fileArray.push(fileInfo)
      }

    })

    return fileArray;
}