var inquirer = require("inquirer");
var fs = require('fs');
var generateHTML = require('./generateHTML')

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
});
