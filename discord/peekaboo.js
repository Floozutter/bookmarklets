(() => {
	const auth = prompt("Token:"); if (auth === null) { return; }
	const api = (
		"https://discord.com/api/v6/channels/"
		+ document.URL.split("/")[5]
		+ "/messages"
	);
	fetch(
		api,
		{
			method: "POST",
			headers: {
				"Authorization": auth,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"content": "Peekaboo!"
			})
		}
	)
	.then(r => r.json())
	.then(d => fetch(
		api + "/" + d.id,
		{
			method: "DELETE",
			headers: {
				"Authorization": auth,
			}
		}
	));
})();