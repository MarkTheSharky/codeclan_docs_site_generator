const fs = require('fs')
// const markdownFileList = require('./markdownFileList.json')

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


const fileList = {};

const makeFileObject = (path) => {

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

            const symlink = `${path}/${file}`.substring(0, `${path}/${file}`.indexOf('/', 17)) + `/${file}`
            fileList[`${path}/${file}`] = {
                'filename': file,
                'fileLink': `${path}/${file}`,
                'symlink': symlink,
                'start_code': '',
                'end_code': '',
                'youtube_link': ''
            }
        }
    })

    fs.writeFile('markdownFileList.json', JSON.stringify(fileList), (err) => {
        if (err) {
            console.error(err.message);return;
        }
    })

}



renameRootFolder('classnotes')
makeFileObject('codeclan')