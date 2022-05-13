const fs = require('fs')
const replace = require('replace-in-file')

// Array of lesson files
const fileArray = [];

const makeFileArray = (path) => {

  fs.readdirSync(path).forEach(file => {

    const stat = fs.statSync(`${path}/${file}`)

    if (`${path}/${file}` === `${path}/README.md`) {
      return
    }

    // Handle if directory
    if (stat.isDirectory()) {
      makeFileArray(`${path}/${file}`)
    }

    // Handle if file
    if (stat.isFile() && file.endsWith('.md')) {
      fileArray.push(`${path}/${file}`)
    }
  })
}

makeFileArray('../docs/codeclan');



// Change </br> tags to <br>
const options = {
  files: fileArray,
  from: /<\/br>/g,
  to: '<br>',
  countMatches: true,
}

replace(options)
  .then(changedFiles => {
    // fs.writeFileSync('files.json', JSON.stringify(changedFiles, null, 4))
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });

