import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import GameHistory from "./components/GameHistory";
import { useCallback, useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

type special = null | string;
type specialArray = special[];
type Log = {
  row: number;
  col: number;
  Player: string;
};

const INIITIAL_GAMEBOARD: specialArray[] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(board: specialArray[]): null | string {
  let winner: null | string = null;
  WINNING_COMBINATIONS.map((ele): void => {
    if (
      board[ele[0].row][ele[0].column] &&
      board[ele[0].row][ele[0].column] === board[ele[1].row][ele[1].column] &&
      board[ele[1].row][ele[1].column] === board[ele[2].row][ele[2].column]
    ) {
      winner = board[ele[0].row][ele[0].column];
    }
  });
  return winner;
}

function deriveDrawn(board: specialArray[]) {
  let drawn = true;
  board.map((array) => {
    array.map((playerSymbol) => {
      if (playerSymbol === null) drawn = false;
    });
  });
  return drawn;
}

function deriveBoard(gameHistory: Log[]) {
  let newBoard = [...INIITIAL_GAMEBOARD.map((array) => [...array])];
  gameHistory.map((obj: Log): void => {
    newBoard[obj.row][obj.col] = obj.Player;
  });
  return newBoard;
}

const initialLog: Log[] = [];
function App() {
  const [turn, setTurn] = useState("X");
  const [gameHistory, setGameHistory] = useState(initialLog);

  const board = deriveBoard(gameHistory);
  const winner = deriveWinner(board);
  const hasDrawn = deriveDrawn(board);

  const handleChange = useCallback(
    (rowIndex: number, colIndex: number, currentTurn: string) => {
      setGameHistory((prevGameHistory: any): any => {
        let newGameHistroy = [...prevGameHistory];
        let obj = {
          row: rowIndex,
          col: colIndex,
          Player: currentTurn,
        };
        newGameHistroy.push(obj);
        return newGameHistroy;
      });
      setTurn((prevTurn: string): string => {
        let newTurn = "X";
        if (prevTurn === "X") newTurn = "O";
        return newTurn;
      });
    },
    []
  );

  const handleRestart = useCallback(() => {
    setTurn("X");
    setGameHistory(initialLog);
  }, []);

  const handleSelectState=useCallback((rowidx:number,colIdx:number)=>{
    setGameHistory((prevGameHistory:Log[]):Log[]=>{
      let newGameHistroy:Log[]=[];
      for(let idx in prevGameHistory){
        const obj:Log=prevGameHistory[idx];
        if(obj.row===rowidx && obj.col===colIdx){
          newGameHistroy.push(obj);
          let nextTurn="X";
          if(obj.Player==="X") nextTurn="O";
          setTurn(nextTurn);
          break;
        }
        newGameHistroy.push(obj);
      }
      return newGameHistroy;
  })},[]);

  return (
    <div className="App">
      <Header />
      <div className="players">
        <Player
          symbol="X"
          name="Player1"
          isActive={turn === "X" ? true : false}
        />
        <Player
          symbol="O"
          name="Player2"
          isActive={turn === "O" ? true : false}
        />
      </div>
      {winner && (<p className="status">Game Over : {winner} Won!</p>)}
      {hasDrawn && !winner && (<p className="status">Game Over : Match Drawn !</p>)}
      <button onClick={() => handleRestart()}>Restart</button>
      <GameBoard
        onSelectSquare={handleChange}
        board={board}
        winner={winner}
        currentTurn={turn}
      />
      <GameHistory onSelectState={handleSelectState} gameHistory={gameHistory} />
    </div>
  );
}

export default App;
