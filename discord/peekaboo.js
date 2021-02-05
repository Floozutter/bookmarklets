(() => {
    const token = prompt("token:");
    if (token === null) { return; }
    const api = `https://discord.com/api/v6/channels/${document.URL.split("/")[5]}/messages`;
    fetch(api, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"content": "peekaboo!"})
    })
    .then(r => r.json())
    .then(d => fetch(api + "/" + d.id, {
        method: "DELETE",
        headers: {"Authorization": token}
    }));
})();
