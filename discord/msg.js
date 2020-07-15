(() => {
	let auth = "";
	let cid = "";
	fetch(
		`https://discordapp.com/api/v6/channels/${cid}/messages`,
		{
			method: "POST",
			headers: {
				"Authorization": auth,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"content": "uwu this is my POST request"
			})
		}
	)
	.then(r => r.json())
	.then(console.log)
	.catch(console.error);
})();