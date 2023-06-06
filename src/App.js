import {PokeCard} from './Components/PokeCard';
import React, {useState} from 'react';
import { PokeSearcher } from './Pages/PokeSearch';
import Navbar2 from './Components/Navbar2';
import Pokedex from './Pages/Pokedex';
import {Route, Routes} from 'react-router-dom';
import { ThemeProvider } from './Themes/Themecontext';
import './App.css';

function App() {
  const [theme, setTheme] = useState('fire');

  import(`./Themes/${theme}-theme.css`);

  return (
    <>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <Navbar2 />
        <Routes>
          <Route path="/" element={<Pokedex/>}/>
          <Route path="/Search/:search" element={<PokeSearcher/>}/>
          <Route path="/:pokemon" element={<PokeCard/>}/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;