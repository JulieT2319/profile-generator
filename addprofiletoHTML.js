function addProfile(profile) {
	return `</head>

	<body>
	
		<div class="container">
		<div class="wrapper">
			<div class="photo-header"><img src="${profile.avatar_url}"
					alt="${profile.login} User Avatar">
				<h1>${profile.login}</h1>
				<div class="links-nav">
					<div class="nav-links">
						<p>♦ ${
							profile.location
								? `<a href="https://www.google.com/maps/search/?api=1&${profile.location}">Location</a>
							♦`
								: ``
						}
							<a href="${profile.url}">Github</a>
							♦${
								profile.blog
									? `<a href="${profile.blog}">Blog</a>
							♦`
									: ``
							} </p>
					</div>
				</div>
			</div>

	
		<div class="row">
			<div class="col">
				<div class="container">
					<h2>${profile.name ? `${profile.name}` : ``}</h2>
					<p>${profile.bio ? `${profile.bio}` : ``}</p>
				</div>
			</div>
		</div>
	
		<div class="row">
			<div class="col">
				<div class="card">
					<p>Followers: ${profile.followers ? `${profile.followers}` : `0`}</p>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<p>Following: ${profile.following ? `${profile.following}` : `0`}</p >
				</div >
			</div >
		</div >
	
			<div class="row">
				<div class="col">
					<div class="card">
						<p>Public Repos: ${profile.public_repos ? `${profile.public_repos}` : `0`}</p>
					</div>
				</div>`;
}
function addStars(starred) {
	return `<div class="col">
					<div class="card">
						<p>Stars: ${starred.length}</p>
					</div>
				</div>
			</div>
			</div>
			</div>
	
	</body >
	
	</html >`;
}

module.exports = {
	addProfile: addProfile,
	addStars: addStars
};
