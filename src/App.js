import './App.css'
import {PokeList} from './Components/PokeList'
import {PokeCard} from './Components/PokeCard'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokeList />}/>
      <Route path="/:pokemon" element={<PokeCard/>}/>
    </Routes>
  );
}

export default App;