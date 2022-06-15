const fetch = require('node-fetch')
const filesJSON = require('../data/files.json')


async function checkForPageErrors() {

    // start server using server-start-test

    const fileList = Object.keys(filesJSON);

    const statuses = await Promise.all(fileList.map((file) => {
        return fetch(`http://localhost:8080/${filesJSON[file].url}`)
            .then(res => { return [res.status, file] })
    }))

    const errorPages = []

    const result = statuses.forEach((pageStatus) => {
        if (pageStatus[0] !== 200) {
            errorPages.push(pageStatus[1])
        }
    })

    return errorPages
    
}

module.exports = checkForPageErrors
