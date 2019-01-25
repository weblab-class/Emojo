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