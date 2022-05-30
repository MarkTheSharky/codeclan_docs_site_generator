const fs = require('fs')
const readline = require('readline');
const files = require('../data/files.json')


const fileArray = [];

const keys = Object.keys(files)

keys.forEach(key => {
  fileArray.push(key.replace('app', '../..'));
})


function readFile() {

  return fileArray.map(file => {

    return new Promise(resolve => {
      
      let lineCounter = 0

      const rl = readline.createInterface({
        input: fs.createReadStream(file),
      });

      rl.on('line', (line) => {
            
        if (line[0] !== '#') {
          return
        }

        lineCounter++

        if (lineCounter === 1) {
          files[file.replace('../..', 'app')].title = line
          rl.close(line)
        }
      })

      rl.on('close', line => {
        resolve(line)
      })

    })
  })
}

async function setTitle() {
  const done =  await Promise.all(readFile())
  fs.writeFileSync('../data/files.json', JSON.stringify(files, null, 4))
}

setTitle()