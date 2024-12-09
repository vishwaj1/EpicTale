import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectGenrePage.css';
import { AppContext } from '../AppContext';

const genres = [
        { name: 'Mystical Thriller', description: 'Dive into a world of supernatural secrets and eerie suspense.' },
        { name: 'Crime', description: 'Unravel high-stakes heists, criminal plots, and gritty underworld dramas.' },
        { name: 'Murder Mystery', description: 'Solve thrilling whodunits and uncover the killer in gripping mysteries.' },
        { name: 'Urban Horror', description: 'Experience chilling tales lurking in the shadows of the modern city.' },
        { name: 'Dark Humor', description: 'Navigate stories blending satire, wit, and twisted hilarity.' },
        { name: 'Time Travel Adventure', description: 'Embark on mind-bending journeys through time\'s twists and turns.' },
        { name: 'World War', description: 'Relive epic battles, daring missions, and emotional wartime tales.' },
        { name: 'Mythological Epic', description: 'Explore legendary adventures rooted in ancient myths and gods.' },
        { name: 'Love Triangle', description: 'Experience romantic entanglements, heartache, and dramatic decisions.' }
    ];
    // [
        //     { name: 'Fantasy', description: 'Explore magical worlds full of wonder and adventure.' },
        //     { name: 'Sci-Fi', description: 'Embark on an intergalactic journey filled with advanced technology.' },
        //     { name: 'Mystery', description: 'Solve thrilling mysteries and uncover hidden secrets.' },
        //     { name: 'Horror', description: 'Face your fears in a terrifying adventure.' }
        // ];

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
