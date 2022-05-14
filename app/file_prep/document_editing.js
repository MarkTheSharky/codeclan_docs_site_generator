const fs = require('fs')
const replace = require('replace-in-file')
const files = require('../../files.json')


// Array of lesson files
const fileArray = [];

const keys = Object.keys(files)

keys.forEach(key => {
  fileArray.push(key.replace('app', '..'));
})



// Change </br> tags to <br>
// const options = {
//   files: fileArray,
//   from: [/<\/br>/g],
//   to: ['<br>'],
//   countMatches: true,
// }

// replace(options)
//   .then(changedFiles => {
//     // fs.writeFileSync('files.json', JSON.stringify(changedFiles, null, 4))
//     console.log('Modified files:', changedFiles.join(', '));
//   })
//   .catch(error => {
//     console.error('Error occurred:', error);
//   });



const originalFolder = (args) => {
  return files[args.replace('..', 'app')].originalFolder
}


const options = {
  files: '../docs/codeclan/week_01/day_2/conditionals.md',
  from: /!\[([^)]+)\]\(([^)]+)\)/,
  to: (match, p1, p2, ...args) => match.replace(p2, `${originalFolder(args.pop())}${p2}`),
  countMatches: true,
}

replace(options)
  .then(changedFiles => {
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
