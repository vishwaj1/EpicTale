// src/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        storySummary: [],
        previousParagraph: '',
        chosenCharacter: '',
        chosenGenre: '',
        characterTraits: [],
        characterBio: '',
        characterGender: '',
        apiKey: '',
        provider: '',
        turnCount: 0,
        isLoading: false,
        isFinal: false,
        gameState: '',
        storyAndUserInputs: [],
        error: null,
    });

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};
