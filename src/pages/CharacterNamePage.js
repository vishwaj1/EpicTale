import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterNamePage.css';
import fetchCharacterTraitsAndBio from '../hooks/fetchCharacterTraitsAndBio.ts';

const CharacterNamePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
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

    // const handleSubmit = () => {
    //     const characterName = { firstName, lastName };
    //     localStorage.setItem('characterName', JSON.stringify(characterName));
    //     // Navigate to the next page or start the game
    //     navigate('/start-game');
    // };

    const handleSubmit = async () => {
        setLoading(true);
        const characterName = `${firstName} ${lastName}`;

        try {
            // Call your character generation function with necessary inputs
            const characterData = await fetchCharacterTraitsAndBio(
                localStorage.getItem('selectedGenre'),
                characterName,
                '<API_KEY>',
                'chatgpt',
            );

            // Store character data in local storage or context
            localStorage.setItem('characterData', JSON.stringify(characterData));

            console.log(JSON.stringify(characterData));

            // Navigate to the next page
            navigate('/start-game');
        } catch (error) {
            console.error('Error generating character data:', error);
            alert('Failed to generate character data. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
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
        </div>
    );
};

export default CharacterNamePage;