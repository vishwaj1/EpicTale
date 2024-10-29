import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectGenrePage.css';

const genres = [
    { name: 'Fantasy', description: 'Explore magical worlds full of wonder and adventure.' },
    { name: 'Sci-Fi', description: 'Embark on an intergalactic journey filled with advanced technology.' },
    { name: 'Mystery', description: 'Solve thrilling mysteries and uncover hidden secrets.' },
    { name: 'Horror', description: 'Face your fears in a terrifying adventure.' }
];

const SelectGenrePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleGenreClick = (genre) => {
        // Save the selected genre to local storage or pass it to the next page
        localStorage.setItem('selectedGenre', JSON.stringify(genre));
        navigate('/character-name');
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