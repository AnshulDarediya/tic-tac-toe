type Log={
    row:number;
    col:number;
    Player:string;
};

interface MyComponentProps {
    gameHistory:Log[];
    onSelectState:any;
}

const GameHistory: React.FC<MyComponentProps>= ({gameHistory,onSelectState})=>{
    return(
    <ol className="log">
        {gameHistory.map((obj:Log)=>(<li key={String(obj.row)+","+String(obj.col)}>{obj.Player} at {obj.row},{obj.col} . <button onClick={(event)=>onSelectState(obj.row,obj.col)}>ComeBack Here</button></li>))}
    </ol>
    );
};
export default GameHistory;