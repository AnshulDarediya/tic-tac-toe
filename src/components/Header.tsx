import React from 'react';
import imageLogo from '../assests/game-logo.png'
function Header(){
    return (
        <header className='heading'>
            <img src={imageLogo} alt="" /> 
            <h2>Tic-Tac-Toe</h2>
        </header>
    );
};

export default Header