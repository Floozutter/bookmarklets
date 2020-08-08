(() => {
	function getSolution() {
		// Get values required for decoding solution.
		const rowCount = (d[2][0] % d[2][3]) + (d[2][1] % d[2][3]) - (d[2][2] % d[2][3]);  // C
		const colCount = (d[1][0] % d[1][3]) + (d[1][1] % d[1][3]) - (d[1][2] % d[1][3]);  // D
		const Aa = (d[3][0] % d[3][3]) + (d[3][1] % d[3][3]) - (d[3][2] % d[3][3]);
		const V = Aa + 5;
		const Ha = (d[V][0] % d[V][3]) * (d[V][0] % d[V][3]) + (d[V][1] % d[V][3]) * 2 + (d[V][2] % d[V][3]);
		const Ia = d[V + 1];
		// Initialize solution as an Array of Arrays of zeros.
		const solution = Array(rowCount);  // E
		for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
			solution[rowIdx] = Array(colCount).fill(0);
		}
		// Decode solution.
		for (let x = V + 2; x <= V + 1 + Ha; x++) {
			for (let v = d[x][0] - Ia[0] - 1; v < d[x][0] - Ia[0] + d[x][1] - Ia[1] - 1; v++) {
				solution[d[x][3] - Ia[3] - 1][v] = d[x][2] - Ia[2];
			}
		}
		return solution;
	}
	function getRuns(solution) {
		function runsFromLine(line) {
			const rle = [];
			line.forEach((cell, idx) => {
				lastIdx = rle.length - 1;
				if (idx == 0 || rle[lastIdx][0] !== cell) {
					rle.push([cell, 1]);
				} else {
					rle[lastIdx][1]++;
				}
			});
			return rle.filter(run => run[0] !== 0).map(run => run[1]);
		}
		function transpose(grid) {
			return Object.keys(grid[0]).map(colIdx => grid.map(row => row[colIdx]));
		}
		const rowRuns = solution.map(runsFromLine);
		const colRuns = transpose(solution).map(runsFromLine);
		return [rowRuns, colRuns];
	}
	const [rowRuns, colRuns] = getRuns(getSolution());
})();
