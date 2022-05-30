const fs = require('fs')
const path = require('path')


function copyLessonFiles(filepath) {

  fs.readdirSync(filepath).forEach(file => {

      const stat = fs.statSync(`${filepath}/${file}`)

      // Handle if directory
      if (stat.isDirectory()) {
          copyLessonFiles(`${filepath}/${file}`)
      }

      // Handle if a file
      if (stat.isFile() && file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {

          const tempDir = `${filepath}/${file}`.substring(0, `${filepath}/${file}`.indexOf('/', 19))
          const newDir = 'app/docs/codeclan/' + tempDir.slice(11)

          if (!fs.existsSync(newDir)) {
              fs.mkdirSync(newDir, { recursive: true })
          }

          const src = path.join(__dirname, `${filepath}/${file}`)
          const newFile = `${filepath}/${file}`.substring(0, `${filepath}/${file}`.indexOf('/', 19)) + `/${file}`
          const dest = 'app/docs/codeclan' + newFile.slice(10)

          if (!fs.existsSync(dest)) {
              fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL)
          }
      }
  })
}

module.exports = { copyLessonFiles }