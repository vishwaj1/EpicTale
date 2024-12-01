import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Avatar from './components/Avatar';
import SelectGenrePage from './pages/SelectGenrePage';
import CharacterNamePage from './pages/CharacterNamePage';
import GameStartPage from './pages/GameStartPage';
import GameEndPage from './pages/GameEndPage';
import { AppProvider } from './AppContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <Avatar />
      <Link to="/select-genre">
        <button className="start-game-button">Start a Game</button>
      </Link>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/select-genre" element={<SelectGenrePage />} />
          <Route path="/character-name" element={<CharacterNamePage />} />
          <Route path="/start-game" element={<GameStartPage />} />
          <Route path="/game-end" element={<GameEndPage />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default AppWrapper;
