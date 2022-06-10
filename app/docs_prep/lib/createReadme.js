const fs = require('fs')

function createReadme(readmePath) {

    fs.readdirSync(readmePath).forEach(file => {
        
        const readme = `${readmePath}/${file}/README.md`

        if (!fs.existsSync(readme) && fs.statSync(`${readmePath}/${file}`).isDirectory()) {
            fs.writeFileSync(readme, 'Please select a lesson from the sidebar.')
        }
    })

    console.log('README files created successfully.')

}

module.exports = { createReadme }