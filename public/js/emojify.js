// takes plaintext and adds emoji / replaces text with emoji
// import emojify.html, fuzz package
function main() {
	console.log("about to do get request");
	get('/api/whoami', {}, function(user) {
		console.log("found user:");
		console.log(user);
		updateButton(user);
	});
}

function updateButton(user) {
	console.log("button function");
	if (user._id !== undefined) {
		console.log("user found");
		document.getElementById('log').innerText="LOGOUT😘";
	}
}

// get user input from emojify.html
// use fuzz to match post words to database keywords
// get toggle state. replace / append emojis 

// worry about data structure later
// FIXME: store post (copy from catbook)
    // assign ID to post
    // add ID to user.posts
    // post: content, author, timestamp

main();
