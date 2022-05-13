const fs = require('fs')

function makeFileObject(filepath) {

    fs.readdirSync(filepath).forEach(file => {

        const stat = fs.statSync(`${filepath}/${file}`)

        // Handle if directory
        if (stat.isDirectory()) {
            makeFileObject(`${filepath}/${file}`)
        }

        // Handle if a file
        if (stat.isFile() && file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {

            const copiedFileLocation = `${filepath.substring(0, `${filepath}/`.indexOf('/', 19)).replace('classnotes', 'app/docs/codeclan')}/${file}`

            if (fileList[copiedFileLocation]) {
                console.log('Duplicate file name warning: ', file)
            }

            if (fs.existsSync(copiedFileLocation)) {
                fileList[copiedFileLocation] = {
                    'filename': file,
                    'originalFolder': `/${filepath}/`,
                    // 'start_code': '',
                    // 'end_code': '',
                    // 'youtube_link': ''
                }
            }
        }
    })
}

const fileList = {}

function makeJSON(filepath) {

    makeFileObject(filepath)


    if (!fs.existsSync('files.json')) {
        fs.writeFileSync('files.json', JSON.stringify(fileList, null, 4))
        console.log('Files JSON written successfully');
    } else {
        console.log('ERROR: files.JSON already exists');
    }
    
}

makeJSON('classnotes')