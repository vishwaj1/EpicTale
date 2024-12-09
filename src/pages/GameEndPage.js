import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import "./GameEndPage.css";

const GameEndPage = () => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const handleNewGameClick = () => {
    navigate("/", { replace: true });
  };

  const storySummary = state.storySummary || [];

  return (
    <div className="game-end-page">
      <h1>GAME OVER</h1>
      <div className="summary-section">
        <h2>Final Story Summary</h2>
        {storySummary.length > 0 ? (
          <ul>
            {storySummary.map((part, index) => (
              <li key={index}>{part}</li>
            ))}
          </ul>
        ) : (
          <p>No summary available.</p>
        )}
      </div>
      <div className="key-moments-section">
        <h2>Key Moments</h2>
        {/* <p><strong>Epic Recap:</strong> {state.epicRecap || "No recap available."}</p> */}
        <p><strong>Showstopper Moment:</strong> {state.bigMoment || "No moment captured."}</p>
        <p><strong>Signature Move:</strong> {state.frequentActivity || "No quirks recorded."}</p>
        <p><strong>Character Highlight:</strong> {state.characterTraitHighlight || "No highlights available."}</p>
        <p><strong>Theme Exploration:</strong> {state.themeExploration || "No theme song chosen."}</p>
      </div>
      <button onClick={handleNewGameClick}>Start a New Game</button>
    </div>
  );
};

export default GameEndPage;
