(() => {
    const d = {
        "l": "w",
        "r": "w",
        "na": "nya",
        "ne": "nye",
        "ni": "nyi",
        "no": "nyo",
        "nu": "nyu",
        "ove": "uv"
    };
    function r(n) {
        if (n.nodeType === Node.TEXT_NODE) {
            n.textContent = Object.entries(d).reduce(
                (t, [k, v]) => t.replace(new RegExp(k, "g"), v),
                n.textContent
            );
        }
        n.childNodes.forEach(r);
    }
    r(document);
})();
