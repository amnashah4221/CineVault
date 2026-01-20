import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Welcome from './screens/welcomescreen';
import Moviescreen from './screens/moviescreen';
import Tvscreen from './screens/tvshows';
import Watchlist from './screens/watchlist';
import MovieDetails from './screens/details';
import Home from './screens/home';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.className = newTheme ? "dark-theme" : "light-theme";
  };

  useEffect(() => {
    document.documentElement.className = "dark-theme";
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>} />
      <Route path="/home" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>} />
      <Route path="/movies" element={<Moviescreen isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>} />
      <Route path='/tvshows'element={<Tvscreen isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>}/>
      <Route path='/watchlist'element={<Watchlist isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>}/>
      <Route path="/movies/:id" element={<MovieDetails isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>} />
      <Route path='/tvshows/:id'element={<MovieDetails isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>}/>
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;