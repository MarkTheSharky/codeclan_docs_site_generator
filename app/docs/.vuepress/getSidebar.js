const fs = require("fs");
const formatFolderName = require('./utilities/formatFolderName')
const unwantedFolderNames = require('./utilities/unwantedFolderNames')


const readRoot = (path) => {

    const rootFolders = []

    fs.readdirSync(path).forEach(folder => {

      const stat = fs.statSync(`${path}/${folder}`)

      if (stat.isDirectory()) {
        rootFolders.push(`${folder}`)
      }

    })

    return rootFolders
}


const readDir = (path) => {

    const fileArray = [];

    fs.readdirSync(path).forEach(file => {

      const stat = fs.statSync(`${path}/${file}`)

      if (`${path}/${file}` === `${path}/README.md`) {
        return
      }

      const fileInfo = {
        text: formatFolderName(file),
        collapsible: false,
        children: []
      }

      // Handle if directory
      if (stat.isDirectory()) {
        fileInfo.children = readDir(`${path}/${file}`)
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



module.exports = function buildSidebar(path) {

  const sidebar = {}
  const rootFolders = readRoot(path)

  rootFolders.forEach(dir => {
    const sidebarArray = readDir(`${path}/${dir}`)
    sidebarArray.unshift({"text": formatFolderName(dir)})
    sidebar[`/codeclan/${dir}`] = sidebarArray
  })
  
  return sidebar
}
