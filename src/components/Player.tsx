import { useState,useCallback } from "react";

interface MyComponentProps {
  symbol:string;
  name: string;
  isActive : boolean;
}

const Player: React.FC<MyComponentProps> = ({symbol,name ,isActive}) => {
  const [currentName,setCurrentName]=useState(name);
  const [isEditing,setIsEditing]=useState(false);

  let element=<label>{currentName}</label>;
  if(isEditing) element= <input onChange={(event)=>handleChange(event)} value={currentName}/>;

  const handleChange=useCallback((event:any):void=>{
    if(isEditing){
      setCurrentName(event.target.value);
    }
  }, [isEditing]);

  const handleClick=useCallback(()=>{
    setIsEditing((prev):boolean=>(!prev));
  },[]);
  
  return (
    <div className={isActive?'active player':'player'}>
      {symbol}
      {element}
      <button onClick={handleClick}>{isEditing?"Save":"Edit"}</button>
    </div>
  );
};
export default Player;
