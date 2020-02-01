var inquirer = require("inquirer");
var fs = require("fs");
var generateHTML = require("./generateHTML");
var addHTML = require("./addprofiletoHTML");
var util = require("util");
var puppeteer = require("puppeteer");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
let queryProfile = "https://api.github.com/users/";
let queryStars = "https://api.github.com/users/";
let HTML;
let finalHTML;
inquirer
	.prompt([
		{
			type: "input",
			name: "username",
			message: "What is your github username?"
		},
		{
			type: "list",
			message: "What is your favorite color?",
			name: "color",
			choices: ["red", "blue", "pink", "green", "purple"]
		}
	])
	.then(function(data) {
		HTML = generateHTML.generateHTML(data);
		queryProfile = "https://api.github.com/users/" + data.username;
		queryStars = "https://api.github.com/users/" + data.username + "/starred";
	})
	.then(function() {
		axios.get(queryProfile).then(function(res) {
			const profile = res.data;
			HTML = HTML + addHTML.addProfile(profile);
		});
	})
	.then(function() {
		axios
			.get(queryStars)
			.then(function(res) {
				const stars = res.data;
				finalHTML = HTML + addHTML.addStars(stars);
			})
			.then(async function() {
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				await page.setContent(finalHTML);
				await page.emulateMedia("screen");
				await page.pdf({
					path: "resume.pdf",
					format: "A4"
				});
				await browser.close();
				console.log("pdf created");
				process.exit();
			});
	})
	// .then(async function() {
	// 	const browser = await puppeteer.launch();
	// 	const page = await browser.newPage();
	// 	await page.setContent(finalHTML);
	// 	await page.emulateMedia("screen");
	// 	await page.pdf({
	// 		path: "resume.pdf",
	// 		format: "A4",
	// 		printBackground: true
	// 	});
	// 	console.log("pdf created");
	// 	await browser.close();
	// 	process.exit();
	// })
	.catch();
// })
// .then(function() {
//   let addProfile = addHTML.addProfile(dummyProfile);
//   let addStars = addHTML.addStars(dummyStarred);
//   let fullinfo = addProfile + addStars;
//   appendFileAsync("index.html", fullinfo);
// })
// .then(function() {
//   console.log("The additional info has been added!");
// });
