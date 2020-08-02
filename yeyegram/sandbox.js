const Cell = Object.freeze({
	UNKNOWN: -1,
	EMPTY: 0,
	FILLED: 1
});

function requiredSpace(runs) {
	const filled = runs.reduce((a, b) => a + b, 0);
	const empty = Math.max(0, runs.length - 1);
	return filled + empty;
}

function possibleSolutions(length, runs) {
	if (runs.length == 0) {
		return [Array(length).fill(Cell.EMPTY)];
	} else if (length < requiredSpace(runs)) {
		return [];
	} else {
		const solutions = [];
		for (let offset = 0; offset < length + 1 - runs[0]; offset++) {
			let head = [
				...Array(offset).fill(Cell.EMPTY),
				...Array(runs[0]).fill(Cell.FILLED),
				Cell.EMPTY
			].slice(0, length);
			possibleSolutions(
				length - head.length,
				runs.slice(1)
			).forEach(s => solutions.push([...head, ...s]));
		}
		return solutions;
	}
}

function stringifyLine(line) {
	return line.map(e => {
		if (e === Cell.UNKNOWN) {
			return "?";
		} else if (e === Cell.EMPTY) {
			return ".";
		} else if (e === Cell.FILLED) {
			return "#";
		} else {
			return "!";
		}
	}).join("");
}

function arrEqual(a, b) {
	if (a.length !== b.length) {
		return false
	}
	a.forEach((_, i) => {
		if (a[i] !== b[i]) {
			return false;
		}
	});
	return true;
}

function test() {
	const asserts = [
		requiredSpace([]) === 0,
		requiredSpace([3]) === 3,
		requiredSpace([3, 2]) === 6,
		requiredSpace([2, 1, 3]) === 8,
		arrEqual(
			possibleSolutions(0, []).map(stringifyLine),
			[""]
		),
		arrEqual(
			possibleSolutions(1, [1]).map(stringifyLine),
			["#"]
		),
		arrEqual(
			possibleSolutions(4, [1]).map(stringifyLine),
			["#...", ".#..", "..#.", "...#"]
		),
		arrEqual(
			possibleSolutions(4, [1, 1]).map(stringifyLine),
			["#.#.", "#..#", ".#.#"]
		),
		arrEqual(
			possibleSolutions(5, [3]).map(stringifyLine),
			["###..", ".###.", "..###"]
		),
		arrEqual(
			possibleSolutions(9, [5, 2]).map(stringifyLine),
			["#####.##.", "#####..##", ".#####.##"]
		)
		arrEqual(
			possibleSolutions(8, [2, 1, 3]).map(stringifyLine),
			["##.#.###"]
		)
	];
	asserts.forEach((a, i) => console.assert(a, i));
}

test();