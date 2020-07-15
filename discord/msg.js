(() => {
	const auth = prompt("Token:");
	if (auth === null) { return; }
	const body = prompt("Message:", "uwu");
	if (body === null) { return; }
	fetch(
		`https://discordapp.com/api/v6/channels/${
			document.URL.split("/")[5]
		}/messages`,
		{
			method: "POST",
			headers: {
				"Authorization": auth,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"content": body
			})
		}
	)
	.then(r => r.json())
	.then(console.log)
	.catch(console.error);
})();