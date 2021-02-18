const DisplayAdjust = ({
  speed,
  onSpeedChange,
  totalBoardRows,
  totalBoardColumns,
  handleSizeChange,
}) => {
  const handleChange = (e) => onSpeedChange(e.target.value);

  return (
    <>
      <label className="text-font">Adjust Speed: </label>
      <input
        className="speed-control"
        type="number"
        min="10"
        max="1000"
        value={speed}
        onChange={handleChange}
      />

      <br />

      <div
        style={{
          padding: 20,
        }}
      >
        <label className="text-font">Board Row: </label>
        <input
          className="speed-control"
          type="number"
          min="10"
          max="150"
          defaultValue={totalBoardRows}
          onBlur={(e) => handleSizeChange("row", Number(e.target.value))}
        />
        <span>x </span>
        <label className="text-font">Board Column: </label>
        <input
          className="speed-control"
          type="number"
          min="10"
          max="150"
          defaultValue={totalBoardColumns}
          onBlur={(e) => handleSizeChange("column", Number(e.target.value))}
        />
      </div>
    </>
  );
};

export default DisplayAdjust;
