import './App.css'
import {PokeList} from './Components/PokeList'
import {PokeCard} from './Components/PokeCard'
import Navbar from './Components/Navbar'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokeList page={2} />}/>
        <Route path="/:pokemon" element={<PokeCard/>}/>
      </Routes>
    </>
  );
}

export default App;