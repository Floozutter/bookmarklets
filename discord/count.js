(() => {
    const token = prompt("token:");
    if (token === null) { return; }
    const api = `https://discord.com/api/v6/channels/${document.URL.split("/")[5]}/messages`;
    (async () => {
        for (let i = 0;; i++) {
            let data = await fetch(api, {
                method: "POST",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"content": i})
            })
            .then(r => r.json());
            await new Promise(r => setTimeout(r, 60000));
            fetch(api + "/" + data.id, {
                method: "DELETE",
                headers: {"Authorization": token}
            });
        }
    })();
})();
