// Code for Updating login/logout button //
var textRemove;
document.addEventListener('DOMContentLoaded', function() {
        textRemove = new Choices(document.getElementById('choices-text-remove-button'), {
        delimiter: ',',
        editItems: true,
        maxItemCount: 10,
        duplicateItemsAllowed: false,
        removeItemButton: true,
      });
    });

function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
		window.user = user;
	});

	get('/api/emoji', {}, function(emojis) {
		renderEmojiDB(emojis);
	  });

	
}


function updateButton(user) {
	if (user._id !== undefined) {
		document.getElementById('log').innerText="LOGOUT😘";
		document.getElementById('log').href="/logout";
		document.getElementById('postBtn').innerText="POST📌";
	}
	else {
		document.getElementById('log').innerText="LOGIN📂";
		document.getElementById('log').href="./auth/google";
		document.getElementById('postBtn').innerText="POST📌 (LOG IN FIRST)";
	}
}

main();

// CODE FOR IMPLEMENTING EMOJIFIER //

window.emojis;
function renderEmojiDB(emojis) {
	window.emojis = emojis;
}

const punct='\\['+ '\\!'+ '\\"'+ '\\#'+ '\\$'+              // since javascript does not
		  '\\%'+ '\\&'+ '\\\''+ '\\('+ '\\)'+             // support POSIX character
		  '\\*'+ '\\+'+ '\\,'+ '\\\\'+ '\\-'+             // classes, we'll need our
		  '\\.'+ '\\/'+ '\\:'+ '\\;'+ '\\<'+              // own version of [:punct:]
		  '\\='+ '\\>'+ '\\?'+ '\\@'+ '\\['+
		  '\\]'+ '\\^'+ '\\_'+ '\\`'+ '\\{'+
		  '\\|'+ '\\}'+ '\\~'+ '\\]' + '\\n';



function emojifyMyText(callback) { // function name also used in emojify.html (change carefully)
	console.log("start spinny thing");
	$('#emojify-input').addClass('loadinggif');
	console.log("spinny thing started");

	// get user plaintext
	const emojifyInputTextbox = document.getElementById("emojify-input");
	let emojifyInput = emojifyInputTextbox.value;
	

	// get toggle state: false = replace; true = add
	let toggleState = document.getElementById("toggle-box").checked;

	// for each word, find if word in keywords for emoji???
	// for each word, calculate ratio(word, keyword in keywords). return emoji with highest avg ratio???

	// split string into array of words & punctuations
	emojifyInput = emojifyInput.trim(); // remove whitespace on both sides
	emojifyInputArray = tokenize(emojifyInput); // FIXME skip punctuations when searching
	
	addArray	 = [];
	replaceArray = [];

	for (let i = 0, len = emojifyInputArray.length; i < len; i++) {

		let elt = emojifyInputArray[i];
		// elt is word or punctuation
		addArray.push(elt);

		if (!punct.includes(elt)) { // elt is word

			let emojiFound = false;

			for (let j = 0, lenEmoji = window.emojis.length; j < lenEmoji; j++) {
				let emojiDoc = window.emojis[j];
				for (let k = 0, lenKey = emojiDoc['keywords'].length; k < lenKey; k++) {
					let keyword = emojiDoc['keywords'][k];
					// match_partial_ratio = fuzzball.partial_ratio(elt, keyword);
					match_ratio = fuzzball.ratio(elt, keyword);
					if (match_ratio > 90) { // FIXME choose emoji with highest score
						addArray.push(emojiDoc['character']);
						replaceArray.push(emojiDoc['character']);
						emojiFound = true;
						break; // use the 1st emoji that matches word
					}
				}
				if (emojiFound) { // break out of the emojis loop & go to next word
					break;
				}

			}
		// after going thru all emojis, if !emojiFound, display word
		if (!emojiFound) {
			replaceArray.push(elt)
		}
		} 
		else { // elt is punctuation
			replaceArray.push(elt);
		}
	}


	// TODO: dropdown list of highest ranking emoji / emoji with partial ratio = 100
	// TODO：when button is toggled / switch text in real time (both texts generated ahead of time) 
	// regex source: https://stackoverflow.com/questions/20047387/remove-space-before-punctuation-javascript-jquery


	if (!toggleState) { // REPLACE
		emojifyInputTextbox.value = replaceArray.join(" ").replace(/ +(\W)/g, "$1");
	}
	else { // ADD
		emojifyInputTextbox.value = addArray.join(" ").replace(/ +(\W)/g, "$1");
	}

	callback();

}

function removeGif() {
	console.log("ending spinny thing");
	$('#emojify-input').removeClass('loadinggif');
	console.log("spinny thing ended");
}

function postStory() {
	//TODO: Post to feed. 
	// id="postBtn"
	// store post (copy from catbook)
		// add post to db
		// get timestamp
		// parse tags into array
	let postContent = document.getElementById("emojify-input").value;
	let tags = document.getElementById('choices-text-remove-button').value;
	let tagsArray = tags.split(',');
	// for (let i = 0; i<tagsArray.length; i++) {
	// 	tagsArray[i]=tagsArray[i].toLowerCase();
	// }
	//TODO FIX TIME ZONES 
	let currentTime = new Date();
	let currentTimeString = currentTime.toLocaleString();
	data = {
		content: postContent,
		timestamp: currentTimeString,
		tags: tagsArray
	};
	if (window.user._id !== undefined) {
		post('/api/story', data);
		document.getElementById("emojify-input").value="";
		textRemove.removeActiveItems();
		//TODO Does not work properly with the tags input object
		//document.getElementById('choices-text-remove-button').value="";
		alert("You posted Successfully🔥🔥🔥, see your new post🔥🔥🔥 in the FEED or SEARCH page🔥🔥🔥!!!")
	}
	else {
		alert("You must be logged in to post!");
	}
}



	// tokenize(str)
// extracts semantically useful tokens from a string containing English-language sentences
// @param {String}    the string to tokenize
// @returns {Array}   contains extracted tokens


// source: https://gist.github.com/raisch/1018823
function tokenize(str) {

	// var punct='\\['+ '\\!'+ '\\"'+ '\\#'+ '\\$'+              // since javascript does not
	// 		  '\\%'+ '\\&'+ '\\\''+ '\\('+ '\\)'+             // support POSIX character
	// 		  '\\*'+ '\\+'+ '\\,'+ '\\\\'+ '\\-'+             // classes, we'll need our
	// 		  '\\.'+ '\\/'+ '\\:'+ '\\;'+ '\\<'+              // own version of [:punct:]
	// 		  '\\='+ '\\>'+ '\\?'+ '\\@'+ '\\['+
	// 		  '\\]'+ '\\^'+ '\\_'+ '\\`'+ '\\{'+
	// 		  '\\|'+ '\\}'+ '\\~'+ '\\]',
 
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