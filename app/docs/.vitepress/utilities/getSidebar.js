import fs from "fs"
import { formatFolderName } from "./formatFolderName"

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

    const filePath = `${path}/${file}`
    const stat = fs.statSync(filePath)

    // Check if file is named index.md and skip if true
    if (filePath === `${path}/index.md`) {
      return
    }

    // Handle if directory
    if (stat.isDirectory()) {
      // Object Template
      const fileInfo = {
        text: formatFolderName(file),
        collapsed: false,
        items: []
      }
      fileInfo.items = readDir(filePath)
      fileArray.push(fileInfo)
    }

    // Handle if a file
    if (stat.isFile()) {
      
      const newPath = path.substring(path.indexOf('/'))
      const fileObject = {
        text: formatFolderName(file),
        link: `${newPath}/${file}`.slice(0, -3)
      }
      fileArray.push(fileObject)
      
    }
  })

  return fileArray;
}

export function buildSidebar(path) {

  const sidebar = {}
  const rootFolders = readRoot(path)

  rootFolders.forEach(dir => {
    const sidebarArray = readDir(`${path}/${dir}`)
    sidebar[`/codeclan/${dir}`] = [{ text: formatFolderName(dir), items: sidebarArray }]
  })

  return sidebar
}