const fs = require('fs')
const path = require('path')
const { getTitle } = require('./getLessonTitle')


const fileList = {}

async function makeFileObject(filepath, codeclanFolder) {

    const files = fs.readdirSync(filepath)
        
    for (const file of files) {

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
    }
}


async function makeJSON(filepath, codeclanFolder) {

    let json = false

    makeFileObject(filepath, codeclanFolder)

    for (const file in fileList) {
        const path = filepath.replace(/classnotes/, file)
        const title = await getTitle(path)
        fileList[file].title = title.replace(/#{1,}\s+/gi, '').replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase()})
    }

    const jsonFile = path.resolve('./data/files.json')

    if (!fs.existsSync(jsonFile)) {
        fs.writeFileSync(jsonFile, JSON.stringify(fileList, null, 4))
        json = true
    }

    return new Promise((resolve, reject) => {   // This probably shouldn't be a promise
        if (json === true) {
            resolve('Files JSON written successfully')
        } else {
            reject('ERROR: files.JSON already exists')
        }
    })
}

module.exports = { makeJSON }