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

	const from = (file) => {
		switch (file.match(/app\/docs\/codeclan\/.*/gi)[0]) {
			case 'app/docs/codeclan/week_11/day_2/arrays_and_arraylists.md':
				return /(?<=So )ArrayList<Integer>(?= would)/i
			// case
			default:
				return /[]/
		}	
	}

	const to = (match) => {
		switch (match) {
			case 'ArrayList<Integer>':
				return '`ArrayList<Integer>`'
			// case
			default:
				console.log('Error in "to" callback, default called and match copied back');
				return match
		}	
	}

	// Add any changes to markdown files below. Numbered keys are used for readability between the from/to values.
		// i.e. Value at key 1 in fromObj will be changed to value at key 1 in toObj and so on.
		
	// WARNING: Any changes will be performed on all files in given object

	const fromObj = {
					1: /<\/br>/g,
					2: /(?<!`){{ ... }}(?!`)/g,
					3: /<%/g,
					4: /!\[([^)]+|)\]\(([^)]+)\)/g,
					5: from
					}

	const toObj = {
					1: '<br>',
					2: '`{{ ... }}`',
					3: '&lt;%',
					4: imageLinkFix,
					5: to,
				}


	const options = {
		dry: true,			/////////////////////////// Disable to run!!!!!!!
		files: keyArray(obj),
		from: Object.values(fromObj),
		to: Object.values(toObj),
		countMatches: true,
	}

function makeChangedFile(results) {
	const changedFiles = results
			.filter(result => result.hasChanged)
			.map(result => result.file);
	console.log(changedFiles);
}

	replace(options)
		.then(changedFiles => {
			makeChangedFile(changedFiles)
			console.log('Completed files change');
			// console.log(changesFiles);
		})
		.catch(error => {
			console.error('Error occurred:', error);
		});
}

module.exports = { editMarkdownFiles }