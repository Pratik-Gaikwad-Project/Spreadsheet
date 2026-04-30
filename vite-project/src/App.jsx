import React, { useState } from "react";
import "./App.css";

function getColumnName(index) {
  let name = "";
  while (index >= 0) {
    name = String.fromCharCode((index % 26) + 65) + name;
    index = Math.floor(index / 26) - 1;
  }
  return name;
}

function App() {
  const [data, setData] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill("")),
  );
  const [mode, setMode] = useState("row"); // row or col
  const [operation, setOperation] = useState("avg"); // avg, max, min

  function updateCell(row, col, value) {
    const newData = [...data];
    newData[row][col] = value;
    setData(newData);
  }

  function addRow() {
    setData([...data, Array(data[0].length).fill("")]);
  }

  function addColumn() {
    setData(data.map((row) => [...row, ""]));
  }

  function calculate(values) {
    const nums = values.map((v) => parseFloat(v)).filter((v) => !isNaN(v));
    if (nums.length === 0) return "";
    if (operation === "avg")
      return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
    if (operation === "max") return Math.max(...nums);
    if (operation === "min") return Math.min(...nums);
    return "";
  }

  function applyResults() {
    if (mode === "row") {
      const results = data.map((row) => calculate(row));
      const newData = [...data, results];
      setData(newData);
    } else {
      const results = data[0].map((_, j) => {
        const colValues = data.map((row) => row[j]);
        return calculate(colValues);
      });
      const newData = data.map((row, i) => [...row, results[i]]);
      setData(newData);
    }
  }

  return (
    <div className="App">
      <h2>📊 React Excel‑Style Spreadsheet</h2>

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={addRow}>➕ Add Row</button>
        <button onClick={addColumn}>➕ Add Column</button>

        <button
          onClick={() => setMode("row")}
          className={mode === "row" ? "active" : ""}
        >
          Row Mode
        </button>
        <button
          onClick={() => setMode("col")}
          className={mode === "col" ? "active" : ""}
        >
          Column Mode
        </button>

        <button
          onClick={() => setOperation("avg")}
          className={operation === "avg" ? "active" : ""}
        >
          AVG
        </button>
        <button
          onClick={() => setOperation("max")}
          className={operation === "max" ? "active" : ""}
        >
          MAX
        </button>
        <button
          onClick={() => setOperation("min")}
          className={operation === "min" ? "active" : ""}
        >
          MIN
        </button>

        <button onClick={applyResults}>Apply Results</button>
      </div>

      {/* Responsive Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              {data[0].map((_, colIndex) => (
                <th key={colIndex}>{getColumnName(colIndex)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th>{rowIndex + 1}</th>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        updateCell(rowIndex, colIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
