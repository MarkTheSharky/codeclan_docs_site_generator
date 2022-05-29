const fs = require('fs')
const files = require('../../files.json')
const readline = require('readline');



const fileArray = [];

const keys = Object.keys(files)

keys.forEach(key => {
  fileArray.push(key.replace('app', '..'));
})


function readFile() {

  return fileArray.map(doc => {

    return new Promise(resolve => {
      
      let lineCounter = 0

      const file = readline.createInterface({
        input: fs.createReadStream(doc),
      });

      file.on('line', (line) => {
            
        if (line[0] !== '#') {
          return
        }

        lineCounter++

        if (lineCounter === 1) {
          files[doc.replace('..', 'app')].title = line
          file.close()
          resolve(line)
        }
      })
    })
  })
}


async function setTitle() {
  const done =  await Promise.all(readFile())
  fs.writeFileSync('files.json', JSON.stringify(files, null, 4))
}

setTitle()
