const fs = require('fs')
const replace = require('replace-in-file')
const path = require('path')

const { keyArray } = require('./getJsonKeys')
const { fileSpecificFrom, fileSpecificTo } = require('./markdownEditingOptions')


function editMarkdownFiles(obj) {

	const imageLinkFix = (match, altText, link, ...args) => {
		console.log('running');

		const imgLink = link.match(/im.+/ig)[0];
		const objKey = args.pop().match(/app\/docs\/codeclan\/.*/gi)[0]
		const originalFolder = obj[objKey].originalFolder
		const linkValid = link.startsWith('@root')

		if (/<(img) src=["|'](.+?)["|'].*/ig.test(match)) {	// Confirm result is HTML img format
			return `![${imgLink.match(/(?<=\/).*(?=\.)/ig)}](${path.join('@root', originalFolder, imgLink)})`;
		}


		if (/!\[([^)]+|)\]\(([^)]+)\)/g.test(match)) {	// Confirm result is Markdown image format
			if (linkValid) {
				return match
			} else {
				return `![${altText}](${path.join('@root', originalFolder, imgLink)})`
			}
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
					5: /<(img) src=["|'](.+?)["|'].*/ig,
					6: fileSpecificFrom			// See markdownEditingOption.js
					}

	const toObj = {
					1: '<br>',
					2: '`{{ ... }}`',
					3: '&lt;%',
					4: imageLinkFix,
					5: imageLinkFix,
					6: fileSpecificTo,			// See markdownEditingOption.js
				}


	const options = {
		// dry: true,			/////////////////////////// Disable to run!!!!!!!
		files: keyArray(obj),
		from: Object.values(fromObj),
		to: Object.values(toObj),
		countMatches: true,
	}

	function makeChangedFile(results) {
		const changedFiles = results
				.filter(result => result.hasChanged)
				.map(result => result.file);
		console.log('Changed Files:', changedFiles);
	}

	replace(options)
		.then((changedFiles) => {
			makeChangedFile(changedFiles)
			console.log('Completed file changes');
		})
		.catch(error => {
			console.error('Error occurred:', error);
		});
}

module.exports = { editMarkdownFiles }