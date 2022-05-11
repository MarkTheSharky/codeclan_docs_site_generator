const fs = require('fs')
const path = require('path')
const fileList = require('./files.json')

function makeSymLinks(filepath) {

    fs.readdirSync(filepath).forEach(file => {

        const stat = fs.statSync(`${filepath}/${file}`)

        // Handle if directory
        if (stat.isDirectory()) {
            makeSymLinks(`${filepath}/${file}`)
        }

        // Handle if a file
        if (stat.isFile() && file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {

            const tempDir = `${filepath}/${file}`.substring(0, `${filepath}/${file}`.indexOf('/', 19))
            const newDir = 'app/docs/codeclan/' + tempDir.slice(11)

            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir, { recursive: true })
            }

            const target = path.join(__dirname, `${filepath}/${file}`)
            const symlink = fileList[`${filepath}/${file}`]['symlink']

            if (!fs.existsSync(symlink)) {
                fs.symlinkSync(target, symlink, 'file')
            }
        }
    })
}

console.log('System Links Created');

// function makeReadme(filepath) {

//     fs.readdirSync(filepath).forEach(file => {
//         const readme = `${filepath}/${file}/README.md`
//         if (!fs.existsSync(readme) && fs.statSync(`${filepath}/${file}`).isDirectory()) {
//             fs.writeFile(readme, '', (err) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log('README files created successfully.')
//                 }
//             })
//         }
//     })
// }

makeSymLinks('classnotes')
// makeReadme('app/docs/codeclan')