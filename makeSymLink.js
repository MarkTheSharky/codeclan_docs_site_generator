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
            const mkdir = 'app/docs/codeclan/' + tempDir.slice(11)

            if (!fs.existsSync(mkdir)) {
                fs.mkdir(mkdir, { recursive: true }, (err) => {
                    if (err) {
                        console.error(err);
                        return
                    }
                    console.log('Directories Created');
                })
            }

            const target = path.join(__dirname, `${filepath}/${file}`)
            const symlink = fileList[`${filepath}/${file}`]['symlink']
            // console.log(symlink);

            if (!fs.existsSync(symlink)) {
                fs.symlink(target, symlink, 'file', (err) => {
                    if (err) {
                        console.error(err);
                        return
                    }
                    console.log('Symlink Created');
                })
            }
        }
    })
}

function makeReadme(filepath) {

    fs.readdirSync(filepath).forEach(file => {
        const readme = `${filepath}/${file}/README.md`
        if (!fs.existsSync(readme) && fs.statSync(`${filepath}/${file}`).isDirectory()) {
            fs.writeFile(readme, '', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('README files created succesfully.')
                }
            })
        }
    })
}

makeSymLinks('classnotes')
makeReadme('app/docs/codeclan')