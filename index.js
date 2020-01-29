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
	let dummyProfile = {
		"login": "JulieT2319",
		"id": 47932789,
		"node_id": "MDQ6VXNlcjQ3OTMyNzg5",
		"avatar_url": "https://avatars0.githubusercontent.com/u/47932789?v=4",
		"gravatar_id": "",
		"url": "https://api.github.com/users/JulieT2319",
		"html_url": "https://github.com/JulieT2319",
		"followers_url": "https://api.github.com/users/JulieT2319/followers",
		"following_url": "https://api.github.com/users/JulieT2319/following{/other_user}",
		"gists_url": "https://api.github.com/users/JulieT2319/gists{/gist_id}",
		"starred_url": "https://api.github.com/users/JulieT2319/starred{/owner}{/repo}",
		"subscriptions_url": "https://api.github.com/users/JulieT2319/subscriptions",
		"organizations_url": "https://api.github.com/users/JulieT2319/orgs",
		"repos_url": "https://api.github.com/users/JulieT2319/repos",
		"events_url": "https://api.github.com/users/JulieT2319/events{/privacy}",
		"received_events_url": "https://api.github.com/users/JulieT2319/received_events",
		"type": "User",
		"site_admin": false,
		"name": "Julie",
		"company": "Clear Insights Group",
		"blog": "https://juliet2319.github.io/personal-portfolio/",
		"location": "Utah",
		"email": null,
		"hireable": null,
		"bio": "I'm a programmer for a market research firm. I enjoy cross stitch, Minecraft, and writing programs to solve minor inconveniences in my life.",
		"public_repos": 10,
		"public_gists": 0,
		"followers": 1,
		"following": 2,
		"created_at": "2019-02-24T02:02:12Z",
		"updated_at": "2020-01-22T22:20:49Z"
	}
	console.log(data.color);
	console.log(data.username);
	let HTML = generateHTML.generateHTML(data);
	writeFileAsync("index.html", HTML)

}).then(function () {
	console.log('The HTML file has been saved!');
});
