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
	if (runs.length === 0) {
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

function getCommon(line, solutions) {
	let solAcc = [...solutions];
	line.forEach((cell, idx) => {
		if (cell !== Cell.UNKNOWN) {
			solAcc = solAcc.filter(sol => sol[idx] === cell);
		}
	});
	if (solAcc.length === 0) {
		return null;
	} else {
		const common = [...line];
		common.forEach((cell, idx) => {
			if (
				cell === Cell.UNKNOWN
				&& solAcc.every(sol => sol[idx] === solAcc[0][idx])
			) {
				common[idx] = solAcc[0][idx];
			}
		});
		return common;
	}
}

class Grid {
	constructor(rowLength, colLength) {
		this.rowLength = rowLength;
		this.colLength = colLength
		this.data = Array(this.rowLength);
		for (let i = 0; i < this.rowLength; i++) {
			this.data[i] = Array(this.colLength).fill(Cell.UNKNOWN);
		}
	}
	getRow(rowIdx) {
		return [...this.data[rowIdx]];
	}
	setRow(rowIdx, line) {
		this.data[rowIdx] = [...line];
	}
	getCol(colIdx) {
		const line = Array(this.rowLength).fill(Cell.UNKNOWN);
		line.forEach((_, idx) => {
			line[idx] = this.data[idx][colIdx];
		});
		return line;
	}
	setCol(colIdx, line) {
		line.forEach((cell, idx) => {
			this.data[idx][colIdx] = line[idx];
		});
	}
}

function solve(rowRuns, colRuns) {
	const grid = new Grid(rowRuns.length, colRuns.length);
	for (let iter = 0; iter < 5; iter++) {
		for (let rowIdx = 0; rowIdx < grid.rowLength; rowIdx++) {
			grid.setRow(rowIdx, getCommon(
				grid.getRow(rowIdx),
				possibleSolutions(grid.colLength, rowRuns[rowIdx])
			));
		}
		for (let colIdx = 0; colIdx < grid.colLength; colIdx++) {
			grid.setCol(colIdx, getCommon(
				grid.getCol(colIdx),
				possibleSolutions(grid.rowLength, colRuns[colIdx])
			));
		}
	}
	return grid;
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

function stringifyGrid(grid) {
	return grid.data.map(stringifyLine).join("\n");
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
		),
		arrEqual(
			possibleSolutions(8, [2, 1, 3]).map(stringifyLine),
			["##.#.###"]
		)
	];
	asserts.forEach((a, i) => console.assert(a, i));
}

function main() {
	// Example nonogram source: https://rosettacode.org/wiki/Nonogram_solver
	console.log(stringifyGrid(solve(
		[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]],
		[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]]
	)));
}

test();
main();
