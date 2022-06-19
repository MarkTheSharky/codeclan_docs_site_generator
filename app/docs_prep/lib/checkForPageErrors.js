const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const filesJSON = require('../data/files.json')
const { launchDevServer } = require('./createDevServer') 

async function checkForPageErrors() {

    // start dev server
    await launchDevServer()

    const fileList = Object.keys(filesJSON);

    console.log('Checking Pages For Errors');

    const statuses = await Promise.all(fileList.map((file) => {
        const url = path.join('http://localhost:8080/@fs', __dirname, '..', '..', '..', `app/docs/.vuepress/.temp/pages/${filesJSON[file].url}.vue`)

        return fetch(url)
            .then(res => { return [res.status, file] })
            // Connection errors produced as checkForPageErrors is called from another file, re run fetch /// Temp fix!!!
            .catch(res => fetch(url)
                    .then(res => { return [res.status, file] })
                    .then(console.log(url))
                    .catch(err => console.error(err) ))
    }))

    const errorPages = []

    statuses.forEach((pageStatus) => {
        if (!pageStatus) { // Handles undefined
            console.log(pageStatus);
            return
        } else if (pageStatus[0] !== 200) {
            errorPages.push(pageStatus)
        }
    })

    fs.writeFileSync(path.join(__dirname, '..', 'data', 'fileErrors.txt'), errorPages.join('\n'))
    console.log('Checking Complete');
}

// checkForPageErrors()

module.exports = { checkForPageErrors }
