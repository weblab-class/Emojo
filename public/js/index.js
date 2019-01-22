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

main();