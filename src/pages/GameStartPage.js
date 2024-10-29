import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameStartPage.css';

const GameStartPage = () => {
    const navigate = useNavigate();
    const [genre, setGenre] = useState(null);
    const [characterName, setCharacterName] = useState(null);
    const [turnCount, setTurnCount] = useState(1);

    useEffect(() => {
        const savedGenre = JSON.parse(localStorage.getItem('selectedGenre'));
        const savedCharacterName = JSON.parse(localStorage.getItem('characterName'));
        setGenre(savedGenre);
        setCharacterName(savedCharacterName);
    }, []);

    const handleNextTurn = () => {
        setTurnCount(turnCount + 1);
    };

    const handleNextGameClick = () => {
        navigate('/game-end');
    };

    return (
        <div className="game-start-page">
            <div className="app-bar">
                <div>Genre: {genre?.name}</div>
                <div>Turn: {turnCount}</div>
                <div>Character: {characterName?.firstName} {characterName?.lastName}</div>
            </div>
            <div className="game-body column">
                <div className="story-section">
                    <p>This is where the story paragraph goes. Make choices to continue your adventure!</p>
                    <div className="options">
                        <button onClick={handleNextTurn}>Option 1</button>
                        <button onClick={handleNextTurn}>Option 2</button>
                        <button onClick={handleNextTurn}>Option 3</button>
                        <button onClick={handleNextGameClick}>Option 4</button>
                    </div>
                </div>
                <div className="character-details">
                    <h3>Character Details</h3>
                    <p><strong>Name:</strong> {characterName?.firstName} {characterName?.lastName}</p>
                    <p><strong>Bio:</strong> A brave adventurer seeking glory and riches.</p>
                    <p><strong>Gender:</strong> Non-binary</p>
                    <p><strong>Traits:</strong> Courageous, Intelligent, Charismatic</p>
                </div>
            </div>
        </div>
    );
};

export default GameStartPage;
