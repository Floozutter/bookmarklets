(() => {
    class Hider {
        constructor(selector, space = false, temp = false) {
            this.selector = selector;
            this.space = space;
            this.temp = temp;
        }
    }
    const hiders = [
        new Hider("#top", true),
        new Hider("#friend_box"),
        new Hider(".round__underboard,.round__underchat"),
        new Hider("time"),
        new Hider(".bookmark"),
        new Hider(".status", true, true),
        new Hider("good,bad", true, true),
        new Hider(".mchat__tab.palantir"),
        new Hider(".mchat__say,.mchat__presets"),
        new Hider(".rcontrols"),
        new Hider(".flip,.analysis", true),
        new Hider(".rclock", false, true),
    ];
    const hide = () => {
        hiders.forEach(h => {
            document.querySelectorAll(h.selector).forEach(e => {
                if (!h.space) {
                    e.style.display = "none";
                } else {
                    e.style.visibility = "hidden";
                }
            });
        });
    };
    const unhide = () => {
        hiders.filter(h => h.temp).forEach(h => {
            document.querySelectorAll(h.selector).forEach(e => {
                e.style.display = null;
                e.style.visibility = null;
            });
        });
    };
    document.addEventListener("keydown", e => {
        if (e.code == "KeyZ") {
            unhide();
        } else if (e.code == "KeyX") {
            hide();
        }
    });
    hide();
})();
