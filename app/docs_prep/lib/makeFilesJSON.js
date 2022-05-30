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

            const endIndex = `${filepath}/`.indexOf('/', 28)    // This gives us the index of '/' after the 'day_*' folder
            const copiedFileLocation = `${filepath.substring(0, endIndex)   // This gives us the filepath up to and including the 'day_*' folder
                                                  .replace('../../../classnotes', 'app/docs/codeclan')}/${file}`

            if (fileList[copiedFileLocation]) {
                console.log('Duplicate file name warning: ', file)
            }

            if (fs.existsSync(`../../../${copiedFileLocation}`)) {   // Check that file was copied to '/codeclan/' folder before adding to JSON
                fileList[copiedFileLocation] = {
                    'filename': file,
                    'originalFolder': `/${filepath.substring(9)}/`,
                    'title': null,
                    'start_code': null,
                    'end_code': null,
                    // 'youtube_link': ''
                }
            }
        }
    })
}

const fileList = {}

function makeJSON(filepath) {

    makeFileObject(filepath)

    if (!fs.existsSync('../data/files.json')) {
        fs.writeFileSync('../data/files.json', JSON.stringify(fileList, null, 4))
        console.log('Files JSON written successfully');
    } else {
        console.log('ERROR: files.JSON already exists');
    }
    
}

makeJSON('../../../classnotes')