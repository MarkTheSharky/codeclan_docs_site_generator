const fs = require('fs')
const path = require('path')


const fileList = {}

function makeFileObject(filepath, codeclanFolder) {

    fs.readdirSync(filepath).forEach(file => {

        const stat = fs.statSync(`${filepath}/${file}`)

        // Handle if directory
        if (stat.isDirectory()) {
            makeFileObject(`${filepath}/${file}`, codeclanFolder)
        }

        // Handle if a file
        if (stat.isFile() && file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {

            const dirWeekDay = filepath.match(/(?<=classnotes)(\/.+?\/.+?\/)|(?<=classnotes)(\/.+)/gi)[0]
            const copiedFileLocation = path.resolve(`${codeclanFolder}/${dirWeekDay}/${file}`)

            if (fileList[copiedFileLocation.match(/app\/docs\/codeclan\/.*/gi)]) {
                console.log('Duplicate file name warning: ', file)
            }

            if (fs.existsSync(copiedFileLocation)) {   // Check that file was copied to '/codeclan/' folder before adding to JSON
                fileList[copiedFileLocation.match(/app\/docs\/codeclan\/.*/gi)] = {
                    'filename': file,
                    'originalFolder': filepath.match(/classnotes.*/gi)[0],
                    'title': null,
                    'start_code': null,
                    'end_code': null,
                    // 'youtube_link': ''
                }
            }
        }
    })
}


function makeJSON(filepath, codeclanFolder) {

    makeFileObject(filepath, codeclanFolder)

    const jsonFile = path.resolve('./data/files.json')

    if (!fs.existsSync(jsonFile)) {
        fs.writeFileSync(jsonFile, JSON.stringify(fileList, null, 4))
        console.log('Files JSON written successfully');
    } else {
        console.log('ERROR: files.JSON already exists');
    }
    
}

module.exports = { makeJSON }