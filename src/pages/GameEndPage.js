import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './GameEndPage.css';

const GameEndPage = () => {
    const navigate = useNavigate();
    const { state } = useContext(AppContext);

    const handleNewGameClick = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="game-end-page">
            <h1>GAME OVER</h1>
            <p>{state.storySummary?.join(' ') || 'No summary available.'}</p>
            <button onClick={handleNewGameClick}>Start a new game</button>
        </div>
    );
};

export default GameEndPage;
