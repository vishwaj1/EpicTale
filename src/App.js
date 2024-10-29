import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Avatar from './components/Avatar';
import SelectGenrePage from './pages/SelectGenrePage';
import CharacterNamePage from './pages/CharacterNamePage';
import GameStartPage from './pages/GameStartPage';
import GameEndPage from './pages/GameEndPage';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Avatar />
      <button className="start-game-button" onClick={() => navigate('/select-genre')}>Start a Game</button>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/select-genre" element={<SelectGenrePage />} />
        <Route path="/character-name" element={<CharacterNamePage />} />
        <Route path="/start-game" element={<GameStartPage />} />
        <Route path="/game-end" element={<GameEndPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;