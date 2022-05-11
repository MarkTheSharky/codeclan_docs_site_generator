const fs = require('fs')
const path = require('path')

function copyLessonFiles(filepath) {

    fs.readdirSync(filepath).forEach(file => {

        const stat = fs.statSync(`${filepath}/${file}`)

        // Handle if directory
        if (stat.isDirectory()) {
            copyLessonFiles(`${filepath}/${file}`)
        }

        // Handle if a file
        if (stat.isFile() && file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {

            const tempDir = `${filepath}/${file}`.substring(0, `${filepath}/${file}`.indexOf('/', 19))
            const newDir = 'app/docs/codeclan/' + tempDir.slice(11)

            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir, { recursive: true })
            }

            const src = path.join(__dirname, `${filepath}/${file}`)
            const newFile = `${filepath}/${file}`.substring(0, `${filepath}/${file}`.indexOf('/', 19)) + `/${file}`
            const dest = 'app/docs/codeclan' + newFile.slice(10)

            if (!fs.existsSync(dest)) {
                fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL)
            }
        }
    })
}


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

// Copy lessons to Vuepress Docs

    copyLessonFiles('classnotes')

    console.log('Copied Lesson files to ./app/docs/codeclan');

// Create empty Readme.md files in week folders

    const readmePath = 'app/docs/codeclan'

    fs.readdirSync(readmePath).forEach(file => {
        
        const readme = `${readmePath}/${file}/README.md`

        if (!fs.existsSync(readme) && fs.statSync(`${readmePath}/${file}`).isDirectory()) {
            fs.writeFileSync(readme, '')
        }
    })

    console.log('README files created successfully.')
}


prepareFiles('classnotes')