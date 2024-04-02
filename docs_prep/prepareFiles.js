const fs = require('fs')
const path = require('path')

const { removeGitFolder } = require('./lib/removeGitFolder');
const { copyLessonFiles } = require('./lib/copyLessons');
const { createReadme } = require('./lib/createReadme');
const { makeJSON } = require('./lib/makeFilesJSON');
// const { editMarkdownFiles } = require('./lib/markdownEditing');


(async function prepareFiles() {

    const classnotesFolder = path.join(__dirname, '..', 'classnotes')
    const codeclanFolder = path.join(__dirname, '..', 'app', 'docs', 'codeclan')
    const cohortClassnotesFolder = path.join(classnotesFolder, fs.readdirSync(classnotesFolder).filter(file => file.charAt(0) !== '.')[0])

// Git clone class notes

    // To be implemented...

// Remove .git folder from cloned location to avoid an accidental push

    removeGitFolder(cohortClassnotesFolder)

// Copy lessons to Vuepress Docs

    copyLessonFiles(cohortClassnotesFolder, codeclanFolder)

    console.log('Copied Lesson files to /app/docs/codeclanFolder');

// Create Readme.md files in week folders

    createReadme(codeclanFolder)

// Create JSON with files detail

    const filesJson = await makeJSON(cohortClassnotesFolder, codeclanFolder)

// Edit incompatible syntax in lessons + fix image links to point back to correct folder

    // editMarkdownFiles(filesJson)

})()