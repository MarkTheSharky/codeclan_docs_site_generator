const fs = require('fs')
const pathModule = require('path')
const fileList = require('./markdownFileList.json')

const makeFileObject = (path) => {

    fs.readdirSync(path).forEach(file => {

        const stat = fs.statSync(`${path}/${file}`)

        // Handle if directory
        if (stat.isDirectory()) {
            makeFileObject(`${path}/${file}`)
        }

        // Handle if a file
        if (stat.isFile() && file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {

            const tempDir = `${path}/${file}`.substring(0, `${path}/${file}`.indexOf('/', 19))
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

            const target = pathModule.join(__dirname, `${path}/${file}`)
            const symlink = fileList[`${path}/${file}`]['symlink']
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

makeFileObject('classnotes')