const fs = require('fs')
const replace = require('replace-in-file')
const path = require('path')

const { keyArray } = require('./getJsonKeys')


function editMarkdownFiles(obj) {

	const imageLinkFix = (match, altText, link, ...args) => {

		const imgLink = link.match(/im.+/ig)[0];
		const objKey = args.pop().match(/app\/docs\/codeclan\/.*/gi)[0]
		const originalFolder = obj[objKey].originalFolder
		const linkValid = link.startsWith('@root')

		if (linkValid) {
			return match
		} else {
			return `![${altText}](${path.join('@root', originalFolder, imgLink)})`
		}
	}

	// Add any changes to markdown files below. Numbered keys are used for readability between the from/to values.
		// i.e. Value at key 1 in fromObj will be changed to value at key 1 in toObj and so on.
		
	// WARNING: Any changes will be performed on all files in given object

	const fromObj = {
					1: /<\/br>/g,
					2: /{{ ... }}/g,
					3: /<%/g,
					4: /!\[([^)]+|)\]\(([^)]+)\)/g,
					}

	const toObj = {
					1: '<br>',
					2: '`{{ ... }}`',
					3: '&lt;%',
					4: imageLinkFix,
				}


	const options = {
		files: keyArray(obj),
		from: Object.values(fromObj),
		to: Object.values(toObj),
		countMatches: true,
	}

	replace(options)
		.then(changedFiles => {
		console.log('Completed files change');
		// console.log(changesFiles);
		})
		.catch(error => {
		console.error('Error occurred:', error);
		});
}

module.exports = { editMarkdownFiles }