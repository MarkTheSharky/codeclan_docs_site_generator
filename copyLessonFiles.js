const fs = require('fs')
const path = require('path')
const fileList = require('./files.json')

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
            const dest = fileList[`${filepath}/${file}`]['symlink']

            if (!fs.existsSync(dest)) {
                fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL)
            }
        }
    })
}

console.log('Copied Lesson files to ./app/docs/codeclan');

function makeReadme(filepath) {

    fs.readdirSync(filepath).forEach(file => {
        const readme = `${filepath}/${file}/README.md`
        if (!fs.existsSync(readme) && fs.statSync(`${filepath}/${file}`).isDirectory()) {
            fs.writeFileSync(readme, '')
        }
    })
}

console.log('README files created successfully.')

copyLessonFiles('classnotes')
makeReadme('app/docs/codeclan')