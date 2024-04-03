const fs = require('fs')

function createIndex(indexPath) {

    fs.readdirSync(indexPath).forEach(file => {
        
        // Updated to INDEX.md from INDEX.md to work with Vitepress
        const index = `${indexPath}/${file}/index.md`

        if (!fs.existsSync(index) && fs.statSync(`${indexPath}/${file}`).isDirectory()) {
            fs.writeFileSync(index, 'Please select a day from the sidebar.')
        }
    })

    console.log('INDEX files created successfully.')

}

module.exports = { createIndex }