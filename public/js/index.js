function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
	});

	let quote =  document.getElementById('quoteInspire');

	get('/api/stories', {}, function(storiesArr) {
    	quote.value = storiesArr[getRndInteger(0, storiesArr.length)].content;
    });
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
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