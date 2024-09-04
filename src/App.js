import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Player from './components/Player';

function App() {
    const videoUrl = ""; // Замените на URL вашего видео
    const buttons = [
        { name: "Кнопка ЦД 1" },
        { name: "Кнопка ЦД 2" },
        { name: "Кнопка ЦД 3" }
    ];

    return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Player videoUrl={videoUrl} buttons={buttons} />} />
          </Routes>
      </div>
  );
}

export default App;
