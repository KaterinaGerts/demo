import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Player from './components/Player';
import { MetaData } from './utils/MetaData';

function App() {
    const videoUrl = ""; // Замените на URL вашего видео
    const buttons = [
        { name: "Кнопка ЦД 1" },
        { name: "Кнопка ЦД 2" },
        { name: "Кнопка ЦД 3" }
    ];

    return (
        <>
        <MetaData title="Персикомм" description="Массовая генерация рекламных видеороликов" />
      <div className="App">
          <Routes>
              <Route path="/" element={<Player videoUrl={videoUrl} buttons={buttons} />} />
          </Routes>
      </div>
        </>
  );
}

export default App;
