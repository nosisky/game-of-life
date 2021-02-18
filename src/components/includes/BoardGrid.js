const BoardGrid = ({
  boardStatus,
  onToggleCellStatus,
  totalBoardRows,
  totalBoardColumns,
  boardHeight,
  boardWidth,
}) => {
  const handleClick = (r, c) => onToggleCellStatus(r, c);
  const tr = [];

  for (let r = 0; r < totalBoardRows; r++) {
    const td = [];
    for (let c = 0; c < totalBoardColumns; c++) {
      td.push(
        <td
          key={`${r},${c}`}
          className={boardStatus[r] && boardStatus[r][c] ? "alive" : "dead"}
          onClick={() => handleClick(r, c)}
        />
      );
    }
    tr.push(<tr key={r}>{td}</tr>);
  }
  return (
    <table
      style={{
        width: boardWidth,
        height: boardHeight,
      }}
    >
      <tbody>{tr}</tbody>
    </table>
  );
};

export default BoardGrid;
