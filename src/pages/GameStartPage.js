import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameStartPage.css';
import { AppContext } from '../AppContext';
import useStoryProgress from '../hooks/useStoryProgress.ts';

const GameStartPage = () => {
    const navigate = useNavigate();
    const { state, } = useContext(AppContext);
    // console.log('AppContext State:', state);
    const handleUserInput = useStoryProgress();

    const handleOptionSelect = async (optionKey) => {
        try {
            const selectedOption = state.options[optionKey];
            if (!selectedOption) {
                console.error('Invalid option selected.');
                return;
            }

            await handleUserInput(selectedOption); // Fetch the next story part
        } catch (error) {
            console.error('Failed to process story progression:', error);
            alert('An error occurred while progressing the story. Please try again.');
        }
    };

    useEffect(() => {
        if (state.isFinal) {
            navigate('/game-end');
        }
    }, [state.isFinal, navigate]);

    return (
        <div className="game-start-page">
            <div className="app-bar">
                <div>Genre: {state.chosenGenre || 'Loading...'}</div>
                <div>Turn: {state.turnCount}</div>
                <div>Character: {state.chosenCharacter || 'Loading...'}</div>
            </div>
            <div className="game-body column">
                <div className="story-section">
                    <p>{state.storySegment || 'Loading story...'}</p>
                    <div className="options">
                        {state.options
                            ? Object.entries(state.options).map(([key, option]) => (
                                <button
                                    key={key}
                                    onClick={() => handleOptionSelect(key)}
                                    disabled={state.isLoading}
                                >
                                    {option.text}
                                </button>
                            ))
                            : 'Loading options...'}
                    </div>
                </div>
                <div className="character-details">
                    <h3>Character Details</h3>
                    <p><strong>Name:</strong> {state.chosenCharacter || 'Loading...'}</p>
                    <p><strong>Bio:</strong> {state.characterBio || 'Loading...'}</p>
                    {/* <p><strong>Gender:</strong> {state.characterGender || 'Loading...'}</p> */}
                    <p>
                        <strong>Traits:</strong>{' '}
                        {state.characterTraits?.join(', ') || 'Loading...'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GameStartPage;
