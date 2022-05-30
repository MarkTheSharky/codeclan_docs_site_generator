const fs = require('fs')
const replace = require('replace-in-file')
const files = require('../data/files.json')


// Array of lesson files

const fileArray = (obj) => {
  const keys = Object.keys(obj)
  return keys.map(key => {
    return key.replace('app', '../..')
  })
}


const imageLinkRegEx = /!\[([^)]+|)\]\(([^)]+)\)/g
const imageLinkFix = (match, altText, link, ...args) => {

  const slicedLink = link.slice(link.indexOf('i'));
  const fileLink = args.pop()
  const originalFolder = files[fileLink.replace('../..', 'app')].originalFolder
  const linkValid = link.startsWith('../../../../../')

  if (linkValid) {
    return match
  } else {
    return `![${altText}](../../../../..${originalFolder}${slicedLink})`
  }
}


const options = {
  files: fileArray(files),
  from: [/<\/br>/g, /{{ ... }}/g, /<%/g, imageLinkRegEx],
  to: ['<br>', '`{{ ... }}`', '&lt;%', imageLinkFix],
  countMatches: true,
}

replace(options)
  .then(changedFiles => {
    console.log('Completed files change');
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });