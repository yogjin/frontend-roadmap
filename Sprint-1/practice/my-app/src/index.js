import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} // state 끌어올리기
      />
    );
  }

  renderBoard() {
    const boardRows = [];
    for (let i = 0; i < 3; i++) {
      const innerCols = [];
      for (let j = 0; j < 3; j++) {
        innerCols.push(this.renderSquare(i * 3 + j));
      }
      boardRows.push(<div className="board-row">{innerCols}</div>);
    }

    return boardRows;
  }
  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 시간 여행
      history: [{ squares: new Array(9).fill(null) }],
      location: [null],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  // 클릭시 함수: state 끌어올리기
  // "X", "O" 번갈아 나타남
  handleClick(i) {
    // slice: “시간을 되돌려” 그 시점에서 새로운 움직임을 보이면, 지금은 올바르지 않은 “미래”의 기록을 모두 버리는 것을 보장
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const location = this.state.location.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // 누군가 승리하거나 Square가 이미 채워졌다면 클릭 무시
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: [...history, { squares }],
      location: [...location, [Math.floor(i / 3), i % 3]],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // 시간 여행 함수
  // history state는 건드리지 않고 나머지 요소만 변경
  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const location = this.state.location;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `${move}번째로 이동` : `처음으로 이동`;
      const desc_location = move
        ? `(${location[move][0]}, ${location[move][1]})`
        : '';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <span>{desc_location}</span>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
