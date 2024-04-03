const fs = require('fs')
const path = require('path')

const { removeGitFolder } = require('./lib/removeGitFolder');
const { copyLessonFiles } = require('./lib/copyLessons');
const { createIndex } = require('./lib/createIndex');
const { makeJSON } = require('./lib/makeFilesJSON');
const { editMarkdownFiles } = require('./lib/markdownEditing');


(async function prepareFiles() {

    const projectFolder = path.join(__dirname, '..', '..')
    const codeclanFolder = path.join(projectFolder, 'app', 'docs', 'codeclan')
    const classnotesFolder = path.join(projectFolder, 'classnotes')
    const cohortFolder = path.join(classnotesFolder, fs.readdirSync(classnotesFolder).filter(file => !file.includes('docs_prep'))[0])


// // Git clone class notes

//     // To be implemented...

// // Remove .git folder from cloned location to avoid an accidental push

//     removeGitFolder(cohortFolder)

// // Copy lessons to VitePress Docs Folder

//     copyLessonFiles(cohortFolder, codeclanFolder)
//     console.log('Copied Lesson files to /app/docs/codeclanFolder');

// // Create index.md files in week folders

//     createIndex(codeclanFolder)

// // // Create JSON with files detail

//     const filesJson = await makeJSON(cohortFolder, codeclanFolder)

// // Edit incompatible syntax in lessons + fix image links to point back to correct folder

//     editMarkdownFiles(filesJson)

})()