type special=null|string;
type specialArray=special[];

interface MyComponentProps {
    onSelectSquare:Function;
    board : specialArray[];
    winner: string | null;
    currentTurn : string;
  }

const GameBoard: React.FC<MyComponentProps>=({onSelectSquare,board,winner,currentTurn}) =>{
    function handleClick(rowIndex:number,colIndex:number){
        onSelectSquare(rowIndex,colIndex,currentTurn);
    }
    
    return (
        <ol id="game-board">
            {board.map((row, rowIndex:number) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex:number) => (
                            <li key={colIndex}>
                                <button onClick={()=>handleClick(rowIndex,colIndex)} disabled={playerSymbol!=null || winner!=null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
export default GameBoard;