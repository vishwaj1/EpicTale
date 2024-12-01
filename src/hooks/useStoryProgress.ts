import { useContext } from 'react';
import { AppContext } from '../AppContext';
import {
  fetchNextStoryPartAndOptions,
  fetchStorySummary,
} from './fetchNextStoryPart.ts';
import {
  fetchEndingStoryPartAndOptions,
  fetchDetailedStorySummary,
} from './fetchEndingStoryPartAndOptions.ts';
import { saveOrUpdateStory } from '../utilites/indexedDb.ts';

const useStoryProgress = () => {
  const { state, setState } = useContext(AppContext);
  const {
    storySummary,
    previousParagraph,
    chosenCharacter,
    chosenGenre,
    characterTraits,
    characterBio,
    characterGender,
    apiKey,
    provider,
    turnCount,
  } = state;

  const handleUserInput = async (option) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      let response, wrapUpDetails = {};
      let isFinal = false;

      // console.log(turnCount);
      if (turnCount >= 7) {
        // Fetch ending part of the story if turnCount exceeds or equals 7
        response = await fetchEndingStoryPartAndOptions(
          storySummary,
          previousParagraph,
          option,
          chosenCharacter,
          chosenGenre,
          characterTraits,
          characterBio,
          characterGender,
          apiKey,
          provider
        );
        isFinal = response.isFinal;

        if (isFinal) {
          wrapUpDetails = await fetchDetailedStorySummary(
            storySummary,
            apiKey,
            provider
          );
        }
      } else {
        // Fetch next part of the story for intermediate turns
        response = await fetchNextStoryPartAndOptions(
          storySummary,
          previousParagraph,
          option,
          chosenCharacter,
          chosenGenre,
          characterTraits,
          characterBio,
          characterGender,
          apiKey,
          provider
        );
      }

      // Fetch the summary of the new story segment
      const newStorySummary = await fetchStorySummary(
        response.storySegment,
        apiKey,
        provider
      );

      // Prepare the updated state
      const updatedState = {
        ...state,
        storySummary: [
          ...state.storySummary,
          ` :USERS CHOICE: ${option.text} : ${newStorySummary}`,
        ],
        storyAndUserInputs: [
          ...state.storyAndUserInputs,
          option.text,
          response.storySegment,
        ],
        turnCount: state.turnCount + 1,
        previousParagraph: response.storySegment,
        options: response.options,
        isLoading: false,
        ...(isFinal
          ? {
            isFinal: true,
            gameState: 'endingScreen',
            ...wrapUpDetails,
          }
          : {}),
        storySegment: response.storySegment,
      };

      // Update the global state
      setState(updatedState);

      // Persist the updated state in IndexedDB
      saveOrUpdateStory(updatedState);
    } catch (error) {
      console.error('Failed to process story progression:', error);

      // Handle errors by updating the state with an error message
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error.response
          ? `Error: ${error.response.data.message}`
          : 'Failed to fetch story data, please try again.',
      }));
    }
  };

  return handleUserInput;
};

export default useStoryProgress;
