const fs = require('fs')


const fileList = {} // Make function makeFileObject below promise(??) based fileList can go inside function?

function makeFileObject(path) {

    fs.readdirSync(path).forEach(file => {

        const stat = fs.statSync(`${path}/${file}`)

        // Handle if directory
        if (stat.isDirectory()) {
            makeFileObject(`${path}/${file}`)
        }

        // Handle if a file
        if (stat.isFile() && file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {

            if (fileList[`${path}/${file}`]) {
                console.log('Duplicate file name warning: ', file)
            }

            const symlink = `${path}/${file}`.substring(0, `${path}/${file}`.indexOf('/', 19)) + `/${file}`
            
            fileList[`${path}/${file}`] = {
                'filename': file,
                'fileLink': `${path}/${file}`,
                'symlink': 'app/docs/codeclan' + symlink.slice(10),
                'start_code': '',
                'end_code': '',
                'youtube_link': ''
            }
        }
    })



    fs.writeFileSync('files.json', JSON.stringify(fileList), (err) => {
        if (err) {
            console.error(err.message);return;
        }
        console.log('Files written to file succesfully');
    })

}

// makeFileObject('classnotes')