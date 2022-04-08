const fs = require("fs");
const formatFolderName = require('./utilities/formatFolderName')

module.exports = class Sidebar {
  constructor() {
  }

  build = (path) => {
    this.children = Sidebar.readDir(path);
  }

  static formatFolderName(folder) {
    let title = folder
    if (folder[folder.length-2] == 0) {
      title = folder.replace(/_0/g, ' ')
    } else {
      title = folder.replace(/_/g, ' ')
    }
    title = title.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
    return `${title} 📁`
  }

  static readDir(path) {
    const fileArray = [];

    fs.readdirSync(path).forEach(file => {

      const stat = fs.statSync(`${path}/${file}`)

      if (file === 'images' || !stat.isDirectory() && !file.endsWith('.md')) {
        return
      }

      const fileInfo = {
        text: Sidebar.formatFolderName(file),
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