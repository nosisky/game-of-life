export const newBoardStatus = (
  totalBoardColumns,
  totalBoardRows,
  cellStatus = () => Math.random() < 0.4
) => {
  const grid = [];
  for (let r = 0; r < totalBoardRows; r++) {
    grid[r] = [];
    for (let c = 0; c < totalBoardColumns; c++) {
      grid[r][c] = cellStatus();
    }
  }
  return grid;
};
