const fs = require("fs");
const formatFolderName = require('./utilities/formatFolderName')
const unwantedFolderNames = require('./utilities/unwantedFolderNames')

module.exports = class Sidebar {
  constructor() {
  }

  build = (path) => {
    this.children = Sidebar.readDir(path);
  }


  static readRoot(path) {

    let rootFolders = {}

    fs.readdirSync(path).forEach(folder => {

      const stat = fs.statSync(`${path}/${folder}`)

      if (stat.isDirectory()) {
        rootFolders[`/${folder}/`] = []
      }

    })

    console.log(rootFolders);
    return rootFolders

  }


  static readDir(path) {

    const fileArray = [];

    fs.readdirSync(path).forEach(file => {

      const stat = fs.statSync(`${path}/${file}`)

      if (unwantedFolderNames(file, path, stat)) {
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