const fs = require("fs");
const formatFolderName = require('./utilities/formatFolderName')

module.exports = class Sidebar {
  constructor() {
  }

  build = (path) => {
    this.children = Sidebar.readDir(path);
  }

  static readDir(path) {
    const fileArray = [];

    fs.readdirSync(path).forEach(file => {

      const stat = fs.statSync(`${path}/${file}`)

      if (file === 'images' || !stat.isDirectory() && !file.endsWith('.md')) {
        return
      }

      const fileInfo = {
        text: formatFolderName(file),
        collapsible: true,
        children: []
      }

      
      // Handle if directory
      if (stat.isDirectory()) {
        fileInfo.children = Sidebar.readDir(`${path}/${file}`)
        fileArray.push(fileInfo)
      }

      // Handle if a file
      if (stat.isFile()) {
        const newPath = path.substring(path.indexOf('/'))
        fileArray.push(`${newPath}/${file}`)
      }
    })

    return fileArray;
  }
}