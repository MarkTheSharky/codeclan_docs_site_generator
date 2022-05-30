const { copyLessonFiles } = require('./lib/copyLessons')
const { handleClassnotes } = require('./lib/handleClassnotesFolder')
const { createReadme } = require('./lib/createReadme')


(async function prepareFiles(filepath) {

    handleClassnotes(filepath)

// Copy lessons to Vuepress Docs

    copyLessonFiles(filepath)

    console.log('Copied Lesson files to ./app/docs/codeclan');

// Create empty Readme.md files in week folders

    createReadme('app/docs/codeclan')

})('classnotes')