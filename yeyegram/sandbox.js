/*
 * Enum to represent Nonogram cell states.
 * @enum {number}
 */
const Cell = Object.freeze({
    UNKNOWN: -1,
    EMPTY: 0,
    FILLED: 1
});


// Functions for working with lines (rows or columns) of cells.

/*
 * Returns the minimum line length required for the given runs.
 * @param {Array<number>} runs
 * @return {number}
 */
function requiredLength(runs) {
    const filled = runs.reduce((a, b) => a + b, 0);
    const empty = Math.max(0, runs.length - 1);
    return filled + empty;
}

/*
 * Returns every possible solution for the given line length and runs.
 * @param {number} length
 * @param {Array<number>} runs
 * @return {Array<Array<Cell>>}
 */
function possibleSolutions(length, runs) {
    if (runs.length === 0) {
        return [Array(length).fill(Cell.EMPTY)];
    } else if (length < requiredLength(runs)) {
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

/*
 * Returns the line with each unknown cell replaced by the cell common to
 * every solution that fits the given line (if such a commonality exists).
 * @param {Array<Cell>} line
 * @param {Array<Array<Cell>>} solutions
 * @return {Array<Cell>}
 */
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


/*
 * Class to represent the state of a Nonogram's grid.
 */
class Grid {
    constructor(rowCount, colCount) {
        this.rowCount = rowCount;
        this.colCount = colCount
        this.data = Array(this.rowCount);
        for (let i = 0; i < this.rowCount; i++) {
            this.data[i] = Array(this.colCount).fill(Cell.UNKNOWN);
        }
    }
    
    /*
     * Returns a line of the grid.
     * @param {boolean} isRow
     * @param {number} idx
     * @return {Array<Cell>}
     */
    getLine(isRow, idx) {
        if (isRow) {
            return [...this.data[idx]];
        } else {
            return [...Array(this.rowCount)].map(
                (_, rowIdx) => this.data[rowIdx][idx]
            );
        }
    }
    
    /*
     * Sets a line of the grid.
     * @param {boolean} isRow
     * @param {number} idx
     * @param {Array<Cell>} line
     */
    setLine(isRow, idx, line) {
        if (isRow) {
            this.data[idx] = [...line];
        } else {
            line.forEach((cell, rowIdx) => {
                this.data[rowIdx][idx] = line[rowIdx];
            });
        }
    }
}


/*
 * Returns a solution to the Nonogram described by the given runs.
 * @param {Array<Array<number>>} rowsRuns
 * @param {Array<Array<number>>} colsRuns
 * @return {Grid}
 */
function solve([rowsRuns, colsRuns]) {
    const grid = new Grid(rowsRuns.length, colsRuns.length);
    const linesToUpdate = [];
    function updateLine(isRow, idx) {
        const old = grid.getLine(isRow, idx);
        const fresh = getCommon(old, possibleSolutions(
            old.length,
            (isRow ? rowsRuns : colsRuns)[idx]
        ));
        fresh.forEach((freshCell, cellIdx) => {
            if (freshCell !== old[cellIdx]) {
                linesToUpdate.push([!isRow, cellIdx]);
            }
        });
        grid.setLine(isRow, idx, fresh);
    }
    for (let rowIdx = 0; rowIdx < grid.rowCount; rowIdx++) {
        linesToUpdate.push([true, rowIdx]);
    }
    for (let colIdx = 0; colIdx < grid.colCount; colIdx++) {
        linesToUpdate.push([false, colIdx]);
    }
    while (linesToUpdate.length > 0) {
        let [isRow, idx] = linesToUpdate.pop();
        updateLine(isRow, idx);
    }
    return grid;
}


/*
 * Returns a string representation of the given line.
 * @param {Array<Cell>} line
 * @return {string}
 */
function stringifyLine(line) {
    return line.map(
        e => {
            if (e === Cell.UNKNOWN) {
                return "?";
            } else if (e === Cell.EMPTY) {
                return ".";
            } else if (e === Cell.FILLED) {
                return "#";
            } else {
                return "!";
            }
        }
    ).join("");
}

/*
 * Returns a string representation of the given grid.
 * @param {Grid} grid
 * @return {string}
 */
function stringifyGrid(grid) {
    return grid.data.map(stringifyLine).join("\n");
}


function test() {
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
    const asserts = [
        requiredLength([]) === 0,
        requiredLength([3]) === 3,
        requiredLength([3, 2]) === 6,
        requiredLength([2, 1, 3]) === 8,
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
    // Example nonograms source: https://rosettacode.org/wiki/Nonogram_solver
    console.log(stringifyGrid(solve([
        [[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]],
        [[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]]
    ])));
    function runsFromString(str) {
        return str.split("\n").map(
            linesRuns => linesRuns.split(" ").map(
                chars => chars.split("").map(
                    c => c.charCodeAt(0) - "A".charCodeAt(0) + 1
                )
            )
        );
    }
    console.log(stringifyGrid(solve(runsFromString(
        "F CAC ACAC CN AAA AABB EBB EAA ECCC HCCC\n" +
        "D D AE CD AE A DA BBB CC AAB BAA AAB DA AAB AAA BAB AAA CD BBA DA"
    ))));
    console.log(stringifyGrid(solve(runsFromString(
        "CA BDA ACC BD CCAC CBBAC BBBBB BAABAA ABAD AABB BBH BBBD ABBAAA CCEA AACAAB BCACC ACBH DCH ADBE ADBB DBE ECE DAA DB CC\n" +
        "BC CAC CBAB BDD CDBDE BEBDF ADCDFA DCCFB DBCFC ABDBA BBF AAF BADB DBF AAAAD BDG CEF CBDB BBB FC"
    ))));
    console.log(stringifyGrid(solve(runsFromString(
        "E BCB BEA BH BEK AABAF ABAC BAA BFB OD JH BADCF Q Q R AN AAN EI H G\n" +
        "E CB BAB AAA AAA AC BB ACC ACCA AGB AIA AJ AJ ACE AH BAF CAG DAG FAH FJ GJ ADK ABK BL CM"
    ))));
}

test();
main();
