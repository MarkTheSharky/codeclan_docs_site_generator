const fs = require('fs')
const readline = require('readline');


async function getTitle(file) {

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
        resolve(line)
        rl.close()
      }
    })

  })
}

module.exports = { getTitle }