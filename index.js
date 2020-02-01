var inquirer = require("inquirer");
var fs = require("fs");
var generateHTML = require("./generateHTML");
var addHTML = require("./addprofiletoHTML");
var util = require("util");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
let queryProfile = "https://api.github.com/users/";
var dummyProfile = {
  login: "JulieT2319",
  id: 47932789,
  node_id: "MDQ6VXNlcjQ3OTMyNzg5",
  avatar_url: "https://avatars0.githubusercontent.com/u/47932789?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/JulieT2319",
  html_url: "https://github.com/JulieT2319",
  followers_url: "https://api.github.com/users/JulieT2319/followers",
  following_url:
    "https://api.github.com/users/JulieT2319/following{/other_user}",
  gists_url: "https://api.github.com/users/JulieT2319/gists{/gist_id}",
  starred_url: "https://api.github.com/users/JulieT2319/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/JulieT2319/subscriptions",
  organizations_url: "https://api.github.com/users/JulieT2319/orgs",
  repos_url: "https://api.github.com/users/JulieT2319/repos",
  events_url: "https://api.github.com/users/JulieT2319/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/JulieT2319/received_events",
  type: "User",
  site_admin: false,
  name: "Julie",
  company: "Clear Insights Group",
  blog: "https://juliet2319.github.io/personal-portfolio/",
  location: "Utah",
  email: null,
  hireable: null,
  bio:
    "I'm a programmer for a market research firm. I enjoy cross stitch, Minecraft, and writing programs to solve minor inconveniences in my life.",
  public_repos: 10,
  public_gists: 0,
  followers: 4,
  following: 3,
  created_at: "2019-02-24T02:02:12Z",
  updated_at: "2020-01-22T22:20:49Z"
};
let queryStars = "https://api.github.com/users/";
var dummyStarred = [
  {
    id: 229451685,
    node_id: "MDEwOlJlcG9zaXRvcnkyMjk0NTE2ODU=",
    name: "Project-1",
    full_name: "Brendan-Hembury/Project-1",
    private: false,
    owner: {
      login: "Brendan-Hembury",
      id: 56856844,
      node_id: "MDQ6VXNlcjU2ODU2ODQ0",
      avatar_url: "https://avatars2.githubusercontent.com/u/56856844?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/Brendan-Hembury",
      html_url: "https://github.com/Brendan-Hembury",
      followers_url: "https://api.github.com/users/Brendan-Hembury/followers",
      following_url:
        "https://api.github.com/users/Brendan-Hembury/following{/other_user}",
      gists_url: "https://api.github.com/users/Brendan-Hembury/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/Brendan-Hembury/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/Brendan-Hembury/subscriptions",
      organizations_url: "https://api.github.com/users/Brendan-Hembury/orgs",
      repos_url: "https://api.github.com/users/Brendan-Hembury/repos",
      events_url:
        "https://api.github.com/users/Brendan-Hembury/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/Brendan-Hembury/received_events",
      type: "User",
      site_admin: false
    },
    html_url: "https://github.com/Brendan-Hembury/Project-1",
    description: null,
    fork: false,
    url: "https://api.github.com/repos/Brendan-Hembury/Project-1",
    forks_url: "https://api.github.com/repos/Brendan-Hembury/Project-1/forks",
    keys_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/Brendan-Hembury/Project-1/teams",
    hooks_url: "https://api.github.com/repos/Brendan-Hembury/Project-1/hooks",
    issue_events_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/issues/events{/number}",
    events_url: "https://api.github.com/repos/Brendan-Hembury/Project-1/events",
    assignees_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/branches{/branch}",
    tags_url: "https://api.github.com/repos/Brendan-Hembury/Project-1/tags",
    blobs_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/languages",
    stargazers_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/stargazers",
    contributors_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/contributors",
    subscribers_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/subscribers",
    subscription_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/subscription",
    commits_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/compare/{base}...{head}",
    merges_url: "https://api.github.com/repos/Brendan-Hembury/Project-1/merges",
    archive_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/downloads",
    issues_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/labels{/name}",
    releases_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/Brendan-Hembury/Project-1/deployments",
    created_at: "2019-12-21T16:10:26Z",
    updated_at: "2020-01-23T04:33:59Z",
    pushed_at: "2020-01-23T04:33:57Z",
    git_url: "git://github.com/Brendan-Hembury/Project-1.git",
    ssh_url: "git@github.com:Brendan-Hembury/Project-1.git",
    clone_url: "https://github.com/Brendan-Hembury/Project-1.git",
    svn_url: "https://github.com/Brendan-Hembury/Project-1",
    homepage: null,
    size: 2619,
    stargazers_count: 2,
    watchers_count: 2,
    language: "HTML",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: true,
    forks_count: 1,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: null,
    forks: 1,
    open_issues: 0,
    watchers: 2,
    default_branch: "master"
  },
  {
    id: 221104934,
    node_id: "MDEwOlJlcG9zaXRvcnkyMjExMDQ5MzQ=",
    name: "porkchop-express",
    full_name: "Brendan-Hembury/porkchop-express",
    private: false,
    owner: {
      login: "Brendan-Hembury",
      id: 56856844,
      node_id: "MDQ6VXNlcjU2ODU2ODQ0",
      avatar_url: "https://avatars2.githubusercontent.com/u/56856844?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/Brendan-Hembury",
      html_url: "https://github.com/Brendan-Hembury",
      followers_url: "https://api.github.com/users/Brendan-Hembury/followers",
      following_url:
        "https://api.github.com/users/Brendan-Hembury/following{/other_user}",
      gists_url: "https://api.github.com/users/Brendan-Hembury/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/Brendan-Hembury/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/Brendan-Hembury/subscriptions",
      organizations_url: "https://api.github.com/users/Brendan-Hembury/orgs",
      repos_url: "https://api.github.com/users/Brendan-Hembury/repos",
      events_url:
        "https://api.github.com/users/Brendan-Hembury/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/Brendan-Hembury/received_events",
      type: "User",
      site_admin: false
    },
    html_url: "https://github.com/Brendan-Hembury/porkchop-express",
    description: "NYT Search",
    fork: false,
    url: "https://api.github.com/repos/Brendan-Hembury/porkchop-express",
    forks_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/forks",
    keys_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/collaborators{/collaborator}",
    teams_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/teams",
    hooks_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/hooks",
    issue_events_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/issues/events{/number}",
    events_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/events",
    assignees_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/branches{/branch}",
    tags_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/tags",
    blobs_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/languages",
    stargazers_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/stargazers",
    contributors_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/contributors",
    subscribers_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/subscribers",
    subscription_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/subscription",
    commits_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/compare/{base}...{head}",
    merges_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/merges",
    archive_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/downloads",
    issues_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/labels{/name}",
    releases_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/Brendan-Hembury/porkchop-express/deployments",
    created_at: "2019-11-12T01:39:26Z",
    updated_at: "2019-12-19T04:07:17Z",
    pushed_at: "2019-12-19T04:23:38Z",
    git_url: "git://github.com/Brendan-Hembury/porkchop-express.git",
    ssh_url: "git@github.com:Brendan-Hembury/porkchop-express.git",
    clone_url: "https://github.com/Brendan-Hembury/porkchop-express.git",
    svn_url: "https://github.com/Brendan-Hembury/porkchop-express",
    homepage: "",
    size: 9,
    stargazers_count: 2,
    watchers_count: 2,
    language: "HTML",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: true,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 2,
    license: null,
    forks: 0,
    open_issues: 2,
    watchers: 2,
    default_branch: "master"
  }
];
let HTML;
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
    axios.get(queryStars).then(function(res) {
      const stars = res.data;
      HTML = HTML + addHTML.addStars(stars);
      console.log(HTML);
    });
  }).then(function(){
    writeFileAsync("index.html", HTML).then(function(){
    return "html file created.";
    }
  )
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
