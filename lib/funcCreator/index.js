// this piece of code exports files dynamically
import fs from 'fs'

function funcCreator() {
	// get the list of file names in the folder
	const fileNames = fs.readdirSync(`lib/funcCreator`)

	let functions = {}
	for (var func of fileNames) {
		if(func === 'index.js') continue

		functions[func.replace('.js', '')] = require(`./${func}`).default
	}

	return functions
}

export default funcCreator
