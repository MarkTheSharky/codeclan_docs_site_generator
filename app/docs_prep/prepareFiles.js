const fs = require('fs')
const path = require('path')

const { copyLessonFiles } = require('./lib/copyLessons');
const { handleClassnotes } = require('./lib/handleClassnotesFolder');
const { createReadme } = require('./lib/createReadme');


(async function prepareFiles() {

    const classnotes = path.resolve('../../classnotes')
    const codeclan = path.resolve('../docs/codeclan')


    // handleClassnotes(classnotes)

// Copy lessons to Vuepress Docs

    copyLessonFiles(classnotes, codeclan)

    // console.log('Copied Lesson files to /app/docs/codeclan');

// Create empty Readme.md files in week folders

    // createReadme('app/docs/codeclan')

})()