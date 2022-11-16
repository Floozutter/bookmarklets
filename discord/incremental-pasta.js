(() => {
    const token = prompt("token:");
    if (token === null) { return; }
    const msg = prompt("message:", "uwu");
    if (msg === null) { return; }
    const indices = [
        ...Array.from(msg.matchAll(/\s+/g)).map(r => r.index),
        undefined
    ];
    const api = `https://discord.com/api/v6/channels/${document.URL.split("/")[5]}/messages`;
    let id = null;
    fetch(api, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"content": "** **"})
    })
    .then(r => r.json())
    .then(async d => {
        const id = d.id;
        for (const i of indices) {
            await new Promise(r => setTimeout(r, 1000));
            fetch(api + "/" + id, {
                method: "PATCH",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"content": msg.slice(0, i)})
            })
        }
    });
})();
