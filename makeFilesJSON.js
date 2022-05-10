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

            if (fileList[`${filepath}/${file}`]) {
                console.log('Duplicate file name warning: ', file)
            }

            const symlink = `${filepath}/${file}`.substring(0, `${filepath}/${file}`.indexOf('/', 19)) + `/${file}`
            
            fileList[`${filepath}/${file}`] = {
                'filename': file,
                'fileLink': `${filepath}/${file}`,
                'symlink': 'app/docs/codeclan' + symlink.slice(10),
                'start_code': '',
                'end_code': '',
                'youtube_link': ''
            }
        }
    })
}

const fileList = {}

function makeJSON(filepath) {

    makeFileObject(filepath)

    fs.writeFileSync('files.json', JSON.stringify(fileList, null, 4))
    console.log('Files JSON written successfully');
}

makeJSON('classnotes')