var inquirer = require("inquirer");
var fs = require("fs");
var generateHTML = require("./generateHTML");
var addHTML = require("./addprofiletoHTML");
var util = require("util");
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
      choices: ["red", "blue", "pink", "green"]
    }
  ])
  .then(function(data) {
    HTML = generateHTML.generateHTML(data);
    queryProfile = "https://api.github.com/users/" + data.username;
    queryStars = "https://api.github.com/users/" + data.username + "/starred";
    console.log(queryProfile);
    console.log(queryStars);
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
        console.log(finalHTML);
      })
      .then(function() {
        writeFileAsync("index.html", finalHTML).then(function() {
          console.log("html file created.");
        });
      });
  })
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
