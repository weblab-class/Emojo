// Code for Updating login/logout button
function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
	});
}

function updateButton(user) {
	if (user._id !== undefined) {
		document.getElementById('log').innerText="LOGOUT😘";
	}
	else {
		document.getElementById('log').innerText="LOGIN📂";
	}
}

// CODE FOR IMPLEMENTING EMOJIFIER

// takes plaintext and adds emoji / replaces text with emoji
// import emojify.html, fuzz package

console.log(fuzzball.ratio("fuzz", "fuzzy"));
//TODO: get user input from emojify.html
// id="emojify-input"

// TODO: access emoji data
// TODO: use fuzz to match post words to database keywords

// TODO: get toggle state. replace / append emojis 
// id="button-16"

// IF REPLACE 

// ELSE (APPEND=DEFAULT)



// TODO:trigger on button click
// id="emojifyBtn"

//TODO: Post. worry about data structure later
// id="postBtn"
// store post (copy from catbook)
    // assign ID to post
    // add post to db
    // add ID to user.posts
    // post: content, author, timestamp

main();
