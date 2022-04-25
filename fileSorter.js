const fs = require('fs')

function renameRootFolder(path) { // This needs to be promised(??) based incase it runs to slow

    const classnotesFolder = fs.readdirSync(path).filter(file => file.charAt(0) !== '.')

    if (classnotesFolder.length === 1) {
        const folders = fs.readdirSync(`${path}/${classnotesFolder}`)

        folders.forEach(folder => {
            const oldPath = `${__dirname}/${path}/${classnotesFolder}/${folder}`
            const newPath = `${__dirname}/${path}/${folder}`
            fs.rename(oldPath, newPath , (err) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
            })
        })
    } else {
        console.log('Unable to deconsolidate classnotes folder, please check directory. There should only be one folder.');
    }

    
    fs.rmdir(`${path}/${classnotesFolder}`, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(`Deleted ${classnotesFolder} folder`);
    })


// Delete .git file
    if (`${path}/.git`) {
        fs.rm(`${path}/.git`, {recursive: true}, (err) => {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log('Deleted .git folder');
        })
    }
}


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


renameRootFolder('classnotes')
makeFileObject('classnotes')