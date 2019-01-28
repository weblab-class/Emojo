// Code for Updating login/logout button //
function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
	});

	get('/api/emoji', {}, function(emojis) {
		// console.log("get /api/emoji");
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
	// console.log("get emojis")
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

	// console.log("partial: ", fuzzball.partial_ratio("smile", "smiley face"));

	// for each word, find if word in keywords for emoji???
	// for each word, calculate ratio(word, keyword in keywords). return emoji with highest avg ratio???

	// split string into array of words & punctuations
	emojifyInput = emojifyInput.trim(); // remove whitespace on both sides
	emojifyInputArray = tokenize(emojifyInput); // FIXME and punctuations
	console.log("input: ", emojifyInput);
	console.log("array: ", emojifyInputArray);



	// TODO: dropdown list of highest ranking emoji / emoji with partial ratio = 100
	// IF REPLACE 
	if (!toggleState) {

	}
	// IF ADD
	else {

	}
	
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


	// tokenize(str)
// extracts semantically useful tokens from a string containing English-language sentences
// @param {String}    the string to tokenize
// @returns {Array}   contains extracted tokens


// source: https://gist.github.com/raisch/1018823
function tokenize(str) {

	var punct='\\['+ '\\!'+ '\\"'+ '\\#'+ '\\$'+              // since javascript does not
			  '\\%'+ '\\&'+ '\\\''+ '\\('+ '\\)'+             // support POSIX character
			  '\\*'+ '\\+'+ '\\,'+ '\\\\'+ '\\-'+             // classes, we'll need our
			  '\\.'+ '\\/'+ '\\:'+ '\\;'+ '\\<'+              // own version of [:punct:]
			  '\\='+ '\\>'+ '\\?'+ '\\@'+ '\\['+
			  '\\]'+ '\\^'+ '\\_'+ '\\`'+ '\\{'+
			  '\\|'+ '\\}'+ '\\~'+ '\\]',
 
		re=new RegExp(                                        // tokenizer
		   '\\s*'+            // discard possible leading whitespace
		   '('+               // start capture group #1
			 '\\.{3}'+            // ellipsis (must appear before punct)
		   '|'+               // alternator
			 '\\w+\\-\\w+'+       // hyphenated words (must appear before punct)
		   '|'+               // alternator
			 '\\w+\'(?:\\w+)?'+   // compound words (must appear before punct)
		   '|'+               // alternator
			 '\\w+'+              // other words
		   '|'+               // alternator
			 '['+punct+']'+        // punct
		   ')'                // end capture group
		 );
 
	// grep(ary[,filt]) - filters an array
	//   note: could use jQuery.grep() instead
	// @param {Array}    ary    array of members to filter
	// @param {Function} filt   function to test truthiness of member,
	//   if omitted, "function(member){ if(member) return member; }" is assumed
	// @returns {Array}  all members of ary where result of filter is truthy
 
	function grep(ary,filt) {
	  var result=[];
	  for(var i=0,len=ary.length;i++<len;) {
		var member=ary[i]||'';
		if(filt && (typeof filt === 'Function') ? filt(member) : member) {
		  result.push(member);
		}
	  }
	  return result;
	}
 
	return grep( str.split(re) );   // note: filter function omitted 
									//       since all we need to test 
									//       for is truthiness
 } // end tokenize()