function main() {
	get('/api/whoami', {}, function(user) {
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

main();