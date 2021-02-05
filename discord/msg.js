(() => {
    const token = prompt("token:");
    if (token === null) { return; }
    const msg = prompt("message:", "uwu");
    if (msg === null) { return; }
    fetch(`https://discord.com/api/v6/channels/${document.URL.split("/")[5]}/messages`, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"content": msg})
    });
})();
