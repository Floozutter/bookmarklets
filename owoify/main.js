(() => {
	function r(n) {
		if (n.nodeType === Node.TEXT_NODE) {
			n.textContent = "owo";
		}
		n.childNodes.forEach(r);
	}
	r(document);
})();