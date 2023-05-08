import './App.css'
import {PokeCard} from './Components/PokeCard'
//import { PokePager } from './Components/PokePager';
import { PokeSearcher } from './Components/PokeSearch'
import Navbar2 from './Components/Navbar2'
import PokePager from './Components/PokePager2';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<PokePager/>}/>
        <Route path="/Search/:search" element={<PokeSearcher/>}/>
        <Route path="/:pokemon" element={<PokeCard/>}/>
      </Routes>
    </>
  );
}

export default App;