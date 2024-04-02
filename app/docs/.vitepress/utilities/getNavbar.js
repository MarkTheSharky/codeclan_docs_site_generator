import fs from "fs"
import { formatFolderName } from "./formatFolderName.js"

export function makeNavBar(path) {

  const fileArray = []

  fs.readdirSync(path).forEach(file => {

    const stat = fs.statSync(`${path}/${file}`)

    const fileInfo = {
      text: formatFolderName(file),
      link: ''
    }

    // Handle if directory
    if (stat.isDirectory()) {
      const newPath = path.substring(path.indexOf('/'))
      fileInfo.link = `${newPath}/${file}/`
      fileArray.push(fileInfo)
    }
  })

  return fileArray;
}