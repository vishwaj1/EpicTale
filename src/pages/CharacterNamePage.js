import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterNamePage.css';
import fetchCharacterTraitsAndBio from '../hooks/fetchCharacterTraitsAndBio.ts';
import { AppContext } from '../AppContext';
import { CHATGPT_API_KEY, CHATGPT_PROVIDER_NAME } from "../utilites/consts.ts";
import { fetchStoryStart } from '../hooks/fetchStartOfStory.ts';

const CharacterNamePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const { state, setState } = useContext(AppContext); // Access AppContext
    console.log('AppContext State:', state);
    const navigate = useNavigate();

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleGenerateRandomName = () => {
        const randomFirstNames = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Morgan'];
        const randomLastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson'];
        setFirstName(randomFirstNames[Math.floor(Math.random() * randomFirstNames.length)]);
        setLastName(randomLastNames[Math.floor(Math.random() * randomLastNames.length)]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const characterName = `${firstName} ${lastName}`;
        const selectedGenre = state.chosenGenre; // Use genre from AppContext

        if (!selectedGenre) {
            alert('No genre selected. Please go back and select a genre.');
            setLoading(false);
            return;
        }

        try {
            const characterData = await fetchCharacterTraitsAndBio(
                selectedGenre,
                characterName,
                CHATGPT_API_KEY,
                CHATGPT_PROVIDER_NAME,
            );

            const { characterTraits, characterBio, characterGender } = characterData;

            console.log(characterData);

            const gameStart = await fetchStoryStart(
                selectedGenre,
                characterName,
                characterTraits,
                characterBio,
                characterGender,
                CHATGPT_API_KEY,
                CHATGPT_PROVIDER_NAME,
            );

            console.log(gameStart);

            const { storyStart, options } = gameStart;

            // Update global state with character data
            setState((prevState) => ({
                ...prevState,
                chosenCharacter: characterName,
                characterBio: characterBio,
                characterTraits: characterTraits,
                characterGender: characterGender,
                storySegment: storyStart,
                options: options,
            }));

            navigate('/start-game'); // Navigate to the next page
        } catch (error) {
            console.error('Error generating character data:', error);
            alert('Failed to generate character data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="character-name-page">
            <h2>Enter Your Character's Name</h2>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
            />
            <button onClick={handleGenerateRandomName}>Generate Random Name</button>
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Generating...' : 'Submit'}
            </button>

            {/* Display character data if available */}
            {state.characterData && (
                <div className="character-preview">
                    <h3>Character Preview</h3>
                    <p><strong>Name:</strong> {state.characterData.characterName}</p>
                    <p><strong>Bio:</strong> {state.characterData.characterBio}</p>
                    <p><strong>Gender:</strong> {state.characterData.characterGender}</p>
                    <p>
                        <strong>Traits:</strong>{' '}
                        {state.characterData.characterTraits?.join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CharacterNamePage;
