(() => {
	const token = prompt("Token:");
	if (token === null) { return; }
	
	const msg = prompt("Message:", "uwu");
	if (msg === null) { return; }
	
	fetch(
		`https://discordapp.com/api/v6/channels/${
			document.URL.split("/")[5]
		}/messages`,
		{
			method: "POST",
			headers: {
				"Authorization": token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"content": msg
			})
		}
	);
})();