const fs = require('fs')


function prepareFiles(filepath) {

// Move week folders to '/classnotes/' root

    const classnotesFolder = fs.readdirSync(filepath).filter(file => file.charAt(0) !== '.')

    if (classnotesFolder.length === 1) {
        const folders = fs.readdirSync(`${filepath}/${classnotesFolder}`)

        folders.forEach(folder => {
            const oldPath = `${__dirname}/${filepath}/${classnotesFolder}/${folder}`
            const newPath = `${__dirname}/${filepath}/${folder}`
            fs.renameSync(oldPath, newPath)
        })
    } else {
        console.log(`Unable to deconsolidate classnotes folder`);
    }
    console.log('Moved folders');

// Remove old root folder

    if (classnotesFolder.length === 1) {
        fs.rmSync(`${filepath}/${classnotesFolder}`, { recursive: true })
        console.log(`Removed empty ${classnotesFolder} folder`);
    }

// Remove .git folder

    if (fs.existsSync(`${filepath}/.git`)) {
        fs.rmSync(`${filepath}/.git`, {recursive: true})
        console.log('Removed .git folder');
    }

}


prepareFiles('classnotes')