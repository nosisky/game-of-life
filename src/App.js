import React, { Component } from "react";
import DisplayAdjust from "./components/includes/DisplayAdjust";
import BoardGrid from "./components/includes/BoardGrid";

import { newBoardStatus } from "./helpers/utils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generation: 0,
      isGameRunning: false,
      speed: 500,
      totalBoardRows: 40,
      totalBoardColumns: 60,
      boardWidth: "80%",
      isAdjusted: false,
      boardHeight: "60%",
    };

    this.state.boardStatus = newBoardStatus(
      this.state.totalBoardColumns,
      this.state.totalBoardRows
    );
  }

  handleStopButton = () => {
    return this.state.isGameRunning ? (
      <button type="button" onClick={this.handleStop}>
        Stop
      </button>
    ) : (
      <button type="button" onClick={this.handleRun}>
        Play
      </button>
    );
  };

  handleClearBoard = () => {
    this.setState({
      boardStatus: newBoardStatus(
        this.state.totalBoardColumns,
        this.state.totalBoardRows,
        () => false
      ),
      generation: 0,
    });
  };

  handleNewBoard = () => {
    console.log(this.state);
    this.setState({
      boardStatus: newBoardStatus(
        this.state.totalBoardColumns,
        this.state.totalBoardRows
      ),
      generation: 0,
    });
  };

  adjustBoardWidth = () => {
    if (this.state.isAdjusted) {
      this.setState({
        boardWidth: "60%",
        isAdjusted: false,
        boardHeight: "60%",
      });
    } else {
      this.setState({
        boardWidth: "100%",
        isAdjusted: true,
        boardHeight: "100%",
      });
    }
  };

  toggleCellStatus = (r, c) => {
    const toggleBoardStatus = (prevState) => {
      const clonedBoardStatus = JSON.parse(
        JSON.stringify(prevState.boardStatus)
      );
      clonedBoardStatus[r][c] = !clonedBoardStatus[r][c];
      return clonedBoardStatus;
    };

    this.setState((prevState) => ({
      boardStatus: toggleBoardStatus(prevState),
    }));
  };

  handleStepMoves = () => {
    const nextStep = (prevState) => {
      const boardStatus = prevState.boardStatus;

      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));

      const getValidNeighboursCount = (r, c) => {
        const neighbors = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1],
        ];
        return neighbors.reduce((trueNeighbors, neighbor) => {
          const x = r + neighbor[0];
          const y = c + neighbor[1];
          const isNeighborOnBoard =
            x >= 0 &&
            x < this.state.totalBoardRows &&
            y >= 0 &&
            y < this.state.totalBoardColumns;
          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            return trueNeighbors + 1;
          } else {
            return trueNeighbors;
          }
        }, 0);
      };

      for (let r = 0; r < this.state.totalBoardRows; r++) {
        for (let c = 0; c < this.state.totalBoardColumns; c++) {
          const allValidNeighbours = getValidNeighboursCount(r, c);

          if (!boardStatus[r][c]) {
            if (allValidNeighbours === 3) clonedBoardStatus[r][c] = true;
          } else {
            if (allValidNeighbours < 2 || allValidNeighbours > 3)
              clonedBoardStatus[r][c] = false;
          }
        }
      }

      return clonedBoardStatus;
    };

    this.setState((prevState) => ({
      boardStatus: nextStep(prevState),
      generation: prevState.generation + 1,
    }));
  };

  handleSpeedChange = (newSpeed) => {
    this.setState({ speed: newSpeed });
  };

  handleSizeChange = (type, size) => {
    if (size >= 10 && size <= 150) {
      if (type === "row") {
        this.setState({ totalBoardRows: size }, () => {
          this.handleNewBoard();
        });
      } else {
        this.setState({ totalBoardColumns: size }, () => {
          this.handleNewBoard();
        });
      }
    }
  };

  handleRun = () => {
    this.setState({ isGameRunning: true });
  };

  handleStop = () => {
    this.setState({ isGameRunning: false });
  };

  componentDidUpdate(prevProps, prevState) {
    const { isGameRunning, speed } = this.state;
    const speedChanged = prevState.speed !== speed;
    const gameStarted = !prevState.isGameRunning && isGameRunning;
    const gameStopped = prevState.isGameRunning && !isGameRunning;

    if ((isGameRunning && speedChanged) || gameStopped) {
      clearInterval(this.timerID);
    }

    if ((isGameRunning && speedChanged) || gameStarted) {
      this.timerID = setInterval(() => {
        this.handleStepMoves();
      }, speed);
    }
  }

  render() {
    const {
      boardStatus,
      totalBoardRows,
      totalBoardColumns,
      isGameRunning,
      boardHeight,
      boardWidth,
      speed,
    } = this.state;

    return (
      <div>
        <h1 className="text-font">Game of Life</h1>

        <div className="flexRow upperControls">
          <span>
            <DisplayAdjust
              totalBoardRows={totalBoardRows}
              totalBoardColumns={totalBoardColumns}
              speed={speed}
              onSpeedChange={this.handleSpeedChange}
              handleSizeChange={this.handleSizeChange}
            />
          </span>
        </div>
        <div className="flexRow lowerControls">
          {this.handleStopButton()}

          <button type="button" onClick={this.handleClearBoard}>
            Clear Board
          </button>
          <button type="button" onClick={this.handleNewBoard}>
            Random Board
          </button>
        </div>
        <BoardGrid
          boardHeight={boardHeight}
          boardWidth={boardWidth}
          totalBoardRows={totalBoardRows}
          totalBoardColumns={totalBoardColumns}
          boardStatus={boardStatus}
          onToggleCellStatus={this.toggleCellStatus}
        />
        <button type="button" onClick={this.adjustBoardWidth}>
          Adjust Size
        </button>
      </div>
    );
  }
}

export default App;
