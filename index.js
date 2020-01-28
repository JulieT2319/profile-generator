var inquirer = require("inquirer");
var fs = require('fs');
var generateHTML = require('./generateHTML')
var util = require('util')
const writeFileAsync = util.promisify(fs.writeFile);
inquirer.prompt([
	{
		type: "input",
		name: "username",
		message: "What is your github username?"
	},
	{
		type: "list",
		message: "What is your favorite color?",
		name: "color",
		choices: [
			"red",
			"blue",
			"pink",
			"green"
		]
	},
]).then(function (data) {

	console.log(data.color);
	console.log(data.username);
	let HTML = generateHTML.generateHTML(data);
	writeFileAsync("index.html", HTML).then(function () {
		console.log('The file has been saved!');
	});

});
