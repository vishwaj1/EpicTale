import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectGenrePage.css';
import { AppContext } from '../AppContext';

const genres = [
    { name: 'Fantasy', description: 'Explore magical worlds full of wonder and adventure.' },
    { name: 'Sci-Fi', description: 'Embark on an intergalactic journey filled with advanced technology.' },
    { name: 'Mystery', description: 'Solve thrilling mysteries and uncover hidden secrets.' },
    { name: 'Horror', description: 'Face your fears in a terrifying adventure.' }
];

const SelectGenrePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { setState } = useContext(AppContext); // Access setState from AppContext
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleGenreClick = (genre) => {
        // Update the global state with the selected genre
        setState((prevState) => ({
            ...prevState,
            chosenGenre: genre.name
        }));
        navigate('/character-name'); // Navigate to the next page
    };

    const filteredGenres = genres.filter((genre) =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="select-genre-page">
            <input
                type="text"
                className="search-bar"
                placeholder="Search genres..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="genre-list">
                {filteredGenres.map((genre, index) => (
                    <div key={index} className="genre-card" onClick={() => handleGenreClick(genre)}>
                        <h2>{genre.name}</h2>
                        <p>{genre.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectGenrePage;
