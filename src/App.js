import './App.css'
import {PokeList} from './Components/PokeList'
import {PokeCard} from './Components/PokeCard'
import { PokePager } from './Components/Pagination';
import Navbar from './Components/Navbar'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokePager/>}/>
        <Route path="/:pokemon" element={<PokeCard/>}/>
      </Routes>
    </>
  );
}

export default App;