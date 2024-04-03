const fs = require('fs')


function removeGitFolder(filepath) {

    // Remove .git folder

    if (fs.existsSync(`${filepath}/.git`)) {
        fs.rmSync(`${filepath}/.git`, {recursive: true})
        console.log('Removed .git folder');
    }
}

module.exports = { removeGitFolder }