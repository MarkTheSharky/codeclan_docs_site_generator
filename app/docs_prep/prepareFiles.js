const fs = require('fs')
const path = require('path')

const { copyLessonFiles } = require('./lib/copyLessons');
const { handleClassnotes } = require('./lib/handleClassnotesFolder');
const { createReadme } = require('./lib/createReadme');
const { makeJSON } = require('./lib/makeFilesJSON');


(async function prepareFiles() {

    const classnotes = path.resolve('../../classnotes')
    const codeclan = path.resolve('../docs/codeclan')

// Action steps to handle classnotes folder

    // handleClassnotes(classnotes)

// Copy lessons to Vuepress Docs

    // copyLessonFiles(classnotes, codeclan)

    // console.log('Copied Lesson files to /app/docs/codeclan');

// Create empty Readme.md files in week folders

    // createReadme(codeclan)

// Create JSON with files detail

    await makeJSON(classnotes, codeclan).then(res => console.log(res)).catch(res => console.log(res))

})()