const fs = require('fs')
const replace = require('replace-in-file')
const files = require('../../files.json')

// Array of lesson files
const fileArray = [];

const keys = Object.keys(files)

keys.forEach(key => {
  fileArray.push(key.replace('app', '..'));
})


const makeImageLink = (file, link) => {
  const i = link.indexOf('i')
  const sliced = link.slice(i);
  return `../../../../..${files[file.replace('..', 'app')].originalFolder}${sliced}`
}

const imageFixRegEx = '/!\[([^)]+)\]\(([^)]+)\)/g'
const imageFixToFunction = '(match, p1, p2, ...args) => match.replace(p2, makeImageLink(args.pop(), p2))'

// Change </br> tags to <br> etc
const options = {
  files: fileArray,
  from: [/<\/br>/g, /{{ ... }}/g, /<%/g, imageFixRegEx],
  to: ['<br>', '<span v-pre>{{ ... }}</span>', '&lt;%', imageFixToFunction],
  countMatches: true,
}


replace(options)
  .then(changedFiles => {
    // fs.writeFileSync('files.json', JSON.stringify(changedFiles, null, 4))
    // console.log('Modified files:', JSON.stringify(changedFiles, null, 4));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });