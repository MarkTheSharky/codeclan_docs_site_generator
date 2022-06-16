const path = require('path')
const fetch = require('node-fetch')
const filesJSON = require('../data/files.json')
const { launchDevServer } = require('./createDevServer') 


async function checkForPageErrors() {

    // start dev server
    await launchDevServer()

    console.log('Dev Server Launched');

    const fileList = Object.keys(filesJSON);

    console.log('Checking Pages For Errors');

    const statuses = await Promise.all(fileList.map((file) => {
        const url = path.join('http://localhost:8080/@fs', __dirname, '..', '..', '..', `app/docs/.vuepress/.temp/pages/${filesJSON[file].url}.vue`)

        return fetch(url)
            .then(res => { return [res.status, file] })
            .catch(err => console.error(err) )
    }))

    const errorPages = []

    const result = statuses.forEach((pageStatus) => {
        if (pageStatus[0] !== 200) {
            errorPages.push(pageStatus)
        }
    })

    console.log('Checking Complete');
    // return errorPages
    console.log(errorPages)
    
}

checkForPageErrors()

module.exports = checkForPageErrors
