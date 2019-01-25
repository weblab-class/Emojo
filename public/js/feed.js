function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
	});
	placePosts();
}

function updateButton(user) {
	if (user._id !== undefined) {
		document.getElementById('log').innerText="LOGOUT😘";
		document.getElementById('log').href="/logout";
	}
	else {
		document.getElementById('log').innerText="LOGIN📂";
		document.getElementById('log').href="./auth/google";
	}
}

function placePosts() {
	//TODO get posts from Mongo DB

	//TODO Create div elements like the template

	//TODO add them as children in the container with ID "post-table"
}

main();