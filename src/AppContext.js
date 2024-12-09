import React, { createContext, useState } from 'react';
import { CHATGPT_API_KEY, CHATGPT_PROVIDER_NAME } from './utilites/consts.ts';

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
        apiKey: CHATGPT_API_KEY,
        provider: CHATGPT_PROVIDER_NAME,
        turnCount: 0,
        isLoading: false,
        storySoFar: [],
        isFinal: false,
        gameState: '',
        options: [],
        storySegment: '',
        storyAndUserInputs: [],
        error: null,
        // previousStory: []
    });

    // to increment game turn count
    const incrementTurnCount = (newState = {}) => {
        setState((prevState) => ({
            ...prevState,
            turnCount: prevState.turnCount + 1,
            ...newState, // for any other changes
        }));
    };

    return (
        <AppContext.Provider value={{ state, setState, incrementTurnCount }}>
            {children}
        </AppContext.Provider>
    );
};
