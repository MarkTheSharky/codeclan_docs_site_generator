const fs = require('fs')
const path = require('path')

const { copyLessonFiles } = require('./lib/copyLessons');
const { removeGitFolder } = require('./lib/removeGitFolder');
const { createReadme } = require('./lib/createReadme');
const { makeJSON } = require('./lib/makeFilesJSON');


(async function prepareFiles() {

    const classnotes = path.join(__dirname, '..', '..', 'classnotes')
    const codeclan = path.join(__dirname, '..', 'docs', 'codeclan')
    const cohort = path.join(classnotes, fs.readdirSync(classnotes).filter(file => file.charAt(0) !== '.')[0])

// Action steps to handle classnotes folder

    // removeGitFolder(cohort)

// Copy lessons to Vuepress Docs

    // copyLessonFiles(cohort, codeclan)

    // console.log('Copied Lesson files to /app/docs/codeclan');

// Create empty Readme.md files in week folders

    // createReadme(codeclan)

// Create JSON with files detail

    await makeJSON(cohort, codeclan).then(res => console.log(res)).catch(res => console.log(res))

})()