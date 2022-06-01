const fs = require('fs')
const path = require('path')

const { copyLessonFiles } = require('./lib/copyLessons');
const { removeGitFolder } = require('./lib/removeGitFolder');
const { createReadme } = require('./lib/createReadme');
const { makeJSON } = require('./lib/makeFilesJSON');
const { editMarkdownFiles } = require('./lib/markdownEditing');


(async function prepareFiles() {

    const classnotes = path.join(__dirname, '..', '..', 'classnotes')
    const codeclan = path.join(__dirname, '..', 'docs', 'codeclan')
    const cohort = path.join(classnotes, fs.readdirSync(classnotes).filter(file => file.charAt(0) !== '.')[0])

// Git clone class notes

    // To be implemented...

// // Action steps to handle classnotes folder

    removeGitFolder(cohort)

// // Copy lessons to Vuepress Docs

    copyLessonFiles(cohort, codeclan)

    console.log('Copied Lesson files to /app/docs/codeclan');

// // Create empty Readme.md files in week folders

    createReadme(codeclan)

// Create JSON with files detail

    const filesJson = await makeJSON(cohort, codeclan)

// Edit bad/incompatible syntax in lessons + fix image links to point back to correct folder

    editMarkdownFiles(filesJson)

})()