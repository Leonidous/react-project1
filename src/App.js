import './App.css'
import {PokeCard} from './Components/PokeCard'
import { PokeSearcher } from './Pages/PokeSearch'
import Navbar2 from './Components/Navbar2'
import Pokedex from './Pages/Pokedex';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Pokedex/>}/>
        <Route path="/Search/:search" element={<PokeSearcher/>}/>
        <Route path="/:pokemon" element={<PokeCard/>}/>
      </Routes>
    </>
  );
}

export default App;