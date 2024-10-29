import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameEndPage.css'; 

const GameEndPage = () => {
    const navigate = useNavigate();

    const handleNewGameClick = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="game-end-page">
            <h1>GAME OVER</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button onClick={handleNewGameClick}>Start a new game</button>
        </div>
    );
};

export default GameEndPage;