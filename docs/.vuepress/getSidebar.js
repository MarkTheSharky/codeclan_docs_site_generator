const fs = require("fs");
const nodePath = require("path");

module.exports = class FileTree {
  constructor() {
  }

  build = (path) => {
    this.children = FileTree.readDir(path);
  }

  static formatFolderName(folder) {
    let title = folder.replace(/_/g, ' ');
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
        text: FileTree.formatFolderName(file),
        collapsible: false,
        children: []
      }

      
      // Handle if directory
      if (stat.isDirectory()) {
        fileInfo.collapsible = true
        fileInfo.children = FileTree.readDir(`${path}/${file}`)
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