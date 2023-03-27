import Table from 'react-bootstrap/Table';
import '../App.css'

function MovesTable(Movelist) {
  return (
    <div className='movesTableContainer'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Move Name</th>
            <th>Power</th>
            <th>Accuracy</th>
            <th>PP</th>
            <th>Flavor Text</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
        {Movelist.Movelist.map((move) => (
          <tr>
            <td>{move.name}</td>
            <td>{move.power}</td>
            <td>{move.accuracy}</td>
            <td>{move.pp}</td>
            <td>{getFlavorTextLanguage('en', move.flavor_text_entries)}</td>
            <td><img src={PokeType(move.type.name)} title={move.type.name} className='moveType'/></td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
}

function getFlavorTextLanguage(language, flavorTextArray){
  
  let flavorText = '';

  for(let i in flavorTextArray){
    if(flavorTextArray[i].language.name == language){
      flavorText = flavorTextArray[i].flavor_text;
      break;
    }
  }

  return (flavorText);
}

function PokeType(type){
  const images = importAll(require.context('../Images/typeIcons', false, /\.(png|jpe?g|svg)$/));

  if(type==='grass'){
      return(images['Grass_icon.png']);
  }
  if(type==='poison'){
      return(images['Poison_icon.png']);
  }
  if(type==='bug'){
      return(images['Bug_icon.png']);
  }
  if(type==='dark'){
      return(images['Dark_icon.png']);
  }
  if(type==='dragon'){
      return(images['Dragon_icon.png']);
  }
  if(type==='electric'){
      return(images['Electric_icon.png']);
  }
  if(type==='fairy'){
      return(images['Fairy_icon.png']);
  }
  if(type==='fighting'){
      return(images['Fighting_icon.png']);
  }
  if(type==='fire'){
      return(images['Fire_icon.png']);
  }
  if(type==='flying'){
      return(images['Flying_icon.png']);
  }
  if(type==='ghost'){
      return(images['Ghost_icon.png']);
  }
  if(type==='ground'){
      return(images['Ground_icon.png']);
  }
  if(type==='ice'){
      return(images['Ice_icon.png']);
  }
  if(type==='normal'){
      return(images['Normal_icon.png']);
  }
  if(type==='psychic'){
      return(images['Psychic_icon.png']);
  }
  if(type==='rock'){
      return(images['Rock_icon.png']);
  }
  if(type==='steel'){
      return(images['Steel_icon.png']);
  }
  if(type==='water'){
      return(images['Water_icon.png']);
  }
}

function importAll(r) {
  let images = {};
   r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images
}

export default MovesTable;