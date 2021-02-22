(() => {
    const nodis = "#friend_box";
    const invis = "#top";
    document.querySelectorAll(nodis).forEach((e) => {
        e.style.display = "none";
    });
    document.querySelectorAll(invis).forEach((e) => {
        e.style.visibility = "hidden";
    });
})();
