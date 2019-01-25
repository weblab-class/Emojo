// Code for Updating login/logout button //
function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
	});

	get('/api/emoji', {}, function(emoji) {
		renderEmojiDatabase(emoji);
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

// TODO: access emoji data (Atlas)
def renderEmojiDatabase(emoji) {
	console.log(emoji[0]);
	// return emojiDB;
}


// Import fuzz package
console.log("trying fuzz: ", fuzz.ratio("fuzz", "fuzzy"));

// trigger on button click
// let emojifyBtn = document.getElementById("emojifyBtn");
function emojifyMyText() { // function name also used in emojify.html (change carefully)
	// get user plaintext
	let user_input = document.getElementById("emojify-input").value;
	console.log("user input: ", user_input);	
	
	// get toggle state: false = replace; true = add
	let toggleState = document.getElementById("toggle-box").checked;
	console.log("button checked: ", toggleState);

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




