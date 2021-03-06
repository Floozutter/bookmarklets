(() => {
    document.querySelectorAll("main ~ *, footer, #_share").forEach(e => {
        e.style.display = "none";
    });
})();
