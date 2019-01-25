// Code for Updating login/logout button //
function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
	});
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

main();

// CODE FOR IMPLEMENTING EMOJIFIER //



// trigger on button click
// let emojifyBtn = document.getElementById("emojifyBtn");
function emojifyMyText() { // function name also used in emojify.html (change carefully)
	let user_input = document.getElementById("emojify-input").value;
	console.log("user input: ", user_input);	
	
	// TODO: get toggle state. replace / append emojis 
	let toggle = document.getElementById("toggle-box");
	
	console.log("button state: ", toggle.value);

}
//TODO:  takes plaintext and adds emoji / replaces text with emoji
//TODO: get user input from emojify.html



// TODO: access emoji data

// TODO: fuzz package
// fuzz = require('fuzzball');
// console.log(fuzz.ratio("fuzz", "fuzzy"));

// TODO: use fuzz to match post words to database keywords



// TODO: IF REPLACE 

// TODO: ELSE (APPEND=DEFAULT)





//TODO: Post. worry about data structure later
// id="postBtn"
// store post (copy from catbook)
    // assign ID to post
    // add post to db
    // add ID to user.posts
    // post: content, author, timestamp


