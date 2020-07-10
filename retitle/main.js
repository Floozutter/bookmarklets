(() => {
	const t = prompt("Retitle:", document.title);
	if (t !== null) {
		document.title = t;
	}
})();