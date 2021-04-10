(() => {
    const nav = document.querySelector(".favorite-nav");
    const xpath = "//a[text()='+Fav']";
    const anchor = document.evaluate(
        xpath,
        nav,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
    if (anchor === null) {
        alert("+Fav anchor not found!");
    } else {
        location.assign(anchor.href);
    }
})();
