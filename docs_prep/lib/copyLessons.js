const fs = require('fs')
const path = require('path')


function copyLessonFiles(filepath, codeclanFolder) {

  fs.readdirSync(filepath).forEach(file => {

      const stat = fs.statSync(`${filepath}/${file}`)

      // Handle if directory
      if (stat.isDirectory()) {
          copyLessonFiles(`${filepath}/${file}`, codeclanFolder)
      }

      // Handle if a file
      if (stat.isFile() && file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {

          const dirWeekDay = filepath.match(/(?<=classnotes\/.+?)(\/.+?\/.+?\/)|(?<=classnotes\/.+?)(\/.+)/gi)[0]
          const destinationDir = path.join(codeclanFolder, dirWeekDay)

          if (!fs.existsSync(destinationDir)) {
              fs.mkdirSync(destinationDir, { recursive: true })
          }

          const fileSrc = path.join(filepath, file)
          const fileDest = path.join(destinationDir, file)

          if (!fs.existsSync(fileDest)) {
              fs.copyFileSync(fileSrc, fileDest, fs.constants.COPYFILE_EXCL)
          }
      }
  })
}

module.exports = { copyLessonFiles }