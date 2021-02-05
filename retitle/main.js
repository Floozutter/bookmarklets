(() => {
    const t = prompt("retitle:", document.title);
    if (t !== null) {
        document.title = t;
    }
})();
