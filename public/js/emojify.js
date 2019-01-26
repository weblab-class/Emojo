// Code for Updating login/logout button //
function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
	});

	get('/api/emoji', {}, function(emojis) {
		console.log("get /api/emoji");
		renderEmojiDatabase(emojis);
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

// FIXME
//  access emoji data (Atlas)
function renderEmojiDatabase(emojis) {
	console.log("get emojis")
	// console.log(emojis);
	// return emojiDB;
}




// trigger on button click
// let emojifyBtn = document.getElementById("emojifyBtn");
function emojifyMyText() { // function name also used in emojify.html (change carefully)
	// get user plaintext
	let emojifyInput = document.getElementById("emojify-input").value;
	console.log("user input: ", emojifyInput);	
	
	// get toggle state: false = replace; true = add
	let toggleState = document.getElementById("toggle-box").checked;
	console.log("button checked: ", toggleState);

	console.log("fuzz: ", fuzzball.ratio("fuzz", "fuzzy"));

	// POST text to api.js
	// post('/api/emojifyInput', emojifyInput);
	// post('/api/foo', {}, function() {
	// 	//???
	// })

	// TODO: use fuzz to match post words to database keywords



	// TODO: IF REPLACE 

	// TODO: ELSE (APPEND=DEFAULT)

	// display text 

	// TODO: get emoji once & save? Switch between 2 posts when user toggles button in real time
}


function post(emojifiedPost) {
	//TODO: Post to feed. worry about data structure later
	// id="postBtn"
	// store post (copy from catbook)
		// assign ID to post
		// add post to db
		// add ID to user.posts
		// post: content, author, timestamp, tags
}




