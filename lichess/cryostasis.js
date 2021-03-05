(() => {
    const line = document.querySelector(".ruser-top i.line");
    const offline = () => line.title === "Left the game";
    const clock = document.querySelector(".rclock-top .time");
    const time = () => {
        const numbers = clock.textContent.split(":").map(n => parseInt(n));
        return 60 * numbers[0] + numbers[1];
    };
    let last = 0;
    const keeper = new MutationObserver(() => {
        const curr = Date.now();
        if (offline() && time() <= 2 && curr - last > 1000) {
            window.lichess.socket.send("moretime");
            last = curr;
        }
    });
    keeper.observe(clock, {childList: true});
    console.log("cryostasis on.");
})();
