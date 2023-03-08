import './App.css'
import {PokeCard} from './Components/PokeCard'
import { PokePager } from './Components/PokePager';
import { PokeSearcher } from './Components/PokeSearch'
import Navbar from './Components/Navbar'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokePager/>}/>
        <Route path="/Search/:search" element={<PokeSearcher/>}/>
        <Route path="/:pokemon" element={<PokeCard/>}/>
      </Routes>
    </>
  );
}

export default App;