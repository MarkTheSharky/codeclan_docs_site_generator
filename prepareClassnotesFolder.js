const fs = require('fs')


function prepareFiles(path) {

// Move week folders to '/classnotes/' root
    const classnotesFolder = fs.readdirSync(path).filter(file => file.charAt(0) !== '.')

    if (classnotesFolder.length === 1) {
        const folders = fs.readdirSync(`${path}/${classnotesFolder}`)

        folders.forEach(folder => {
            const oldPath = `${__dirname}/${path}/${classnotesFolder}/${folder}`
            const newPath = `${__dirname}/${path}/${folder}`
            fs.renameSync(oldPath, newPath)
        })
    } else {
        console.log(`Unable to deconsolidate classnotes folder`);
    }
    console.log('Moved folders');

// Remove old root folder

    if (classnotesFolder.length === 1) {
        fs.rmSync(`${path}/${classnotesFolder}`, { recursive: true })
        console.log(`Removed ${classnotesFolder} folder`);
    }

// Remove .git folder

    if (fs.existsSync(`${path}/.git`)) {
        fs.rmSync(`${path}/.git`, {recursive: true})
        console.log('Removed .git folder');
    }

}


prepareFiles('classnotes')