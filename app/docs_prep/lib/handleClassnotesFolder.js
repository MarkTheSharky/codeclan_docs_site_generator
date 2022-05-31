const fs = require('fs')


function handleClassnotes(filepath) {

    // Move week folders to '/classnotes/' root

    const classnotesFolder = fs.readdirSync(filepath).filter(file => file.charAt(0) !== '.')

    if (classnotesFolder.length === 1) {
        
        const folders = fs.readdirSync(`${filepath}/${classnotesFolder}`)

        folders.forEach(folder => {
            const oldPath = `${filepath}/${classnotesFolder}/${folder}`
            const newPath = `${filepath}/${folder}`
            fs.renameSync(oldPath, newPath)
        })

        console.log('Moved folders');
        
    } else {
        console.log(`Unable to deconsolidate classnotes folder`);
    }

    // Remove old root folder

    if (classnotesFolder.length === 1) { // This could be improved, will not run after the first time
        fs.rmSync(`${filepath}/${classnotesFolder}`, { recursive: true })
        console.log(`Removed empty ${classnotesFolder} folder`);
    }

    // Remove .git folder

    if (fs.existsSync(`${filepath}/.git`)) {
        fs.rmSync(`${filepath}/.git`, {recursive: true})
        console.log('Removed .git folder');
    }
}

module.exports = { handleClassnotes }