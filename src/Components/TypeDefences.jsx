import Table from 'react-bootstrap/Table';
import '../App.css'

function TypeChart(types) {

    let damageRelations = [];
    if(!(Object.keys(types).length === 0)){
        types.types.map((typeDamage) => (
            damageRelations.push(typeDamage.damage_relations)
        ))

        damageRelations = typeDamageCalc(damageRelations);
    }

    console.log(damageRelations);

  return (
    <div className='typesTableContainer'>
      <Table striped bordered hover className='typesTable'>
        <thead>
        </thead>
        <tbody>
          <tr>
            <td><img src={PokeType('normal')} title={'normal'} className='Type'/><text className='typeText'>Normal</text></td>
            <td><img src={PokeType('fire')} title={'fire'} className='Type'/><text className='typeText'>Fire</text></td>
            <td><img src={PokeType('water')} title={'water'} className='Type'/><text className='typeText'>Water</text></td>
            <td><img src={PokeType('electric')} title={'electric'} className='Type'/><text className='typeText'>Electric</text></td>
            <td><img src={PokeType('grass')} title={'grass'} className='Type'/><text className='typeText'>Grass</text></td>
            <td><img src={PokeType('ice')} title={'ice'} className='Type'/><text className='typeText'>Ice</text></td>
            <td><img src={PokeType('fighting')} title={'fighting'} className='Type'/><text className='typeText'>Fighting</text></td>
            <td><img src={PokeType('poison')} title={'poison'} className='Type'/><text className='typeText'>Poison</text></td>
            <td><img src={PokeType('ground')} title={'ground'} className='Type'/><text className='typeText'>Ground</text></td>
          </tr>
          <tr>
            {damageRelations.slice(0,9).map((typeDmg) => (
                <>{typeDamageDisplay(typeDmg)}</>
            ))}
          </tr>
          <tr>
            <td><img src={PokeType('flying')} title={'flying'} className='Type'/><text className='typeText'>Flying</text></td>
            <td><img src={PokeType('psychic')} title={'psychic'} className='Type'/><text className='typeText'>Psychic</text></td>
            <td><img src={PokeType('bug')} title={'bug'} className='Type'/><text className='typeText'>Bug</text></td>
            <td><img src={PokeType('rock')} title={'rock'} className='Type'/><text className='typeText'>Rock</text></td>
            <td><img src={PokeType('ghost')} title={'ghost'} className='Type'/><text className='typeText'>Ghost</text></td>
            <td><img src={PokeType('dragon')} title={'dragon'} className='Type'/><text className='typeText'>Dragon</text></td>
            <td><img src={PokeType('dark')} title={'dark'} className='Type'/><text className='typeText'>Dark</text></td>
            <td><img src={PokeType('steel')} title={'steel'} className='Type'/><text className='typeText'>Steel</text></td>
            <td><img src={PokeType('fairy')} title={'fairy'} className='Type'/><text className='typeText'>Fairy</text></td>
          </tr>
          <tr>
            {damageRelations.slice(9,18).map((typeDmg) => (
                <>{typeDamageDisplay(typeDmg)}</>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function typeDamageCalc(damageRelations){

    let typeEffectiveness = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    damageRelations.map((type) => (
        type.double_damage_from.map((doubleDmg) => (
            typeEffectiveness[whichTypeIndex(doubleDmg.name)] *= 2
        ))
    ))

    damageRelations.map((type) => (
        type.half_damage_from.map((halfDmg) => (
            typeEffectiveness[whichTypeIndex(halfDmg.name)] *= 0.5
        ))
    ))

    damageRelations.map((type) => (
        type.no_damage_from.map((noDmg) => (
            typeEffectiveness[whichTypeIndex(noDmg.name)] *= 0
        ))
    ))

    return(typeEffectiveness);
}

function typeDamageDisplay(typeNum){

    if(typeNum === 0){
        return <td className='typeDmgMult' style={{backgroundColor: '#2D2C2C', color: 'white', textAlign: 'center'}}>0x</td>
    }
    if(typeNum === 0.25){
        return <td className='typeDmgMult' style={{backgroundColor: '#800000', color: 'white', textAlign: 'center'}}>0.25x</td>
    }
    if(typeNum === 0.5){
        return <td className='typeDmgMult' style={{backgroundColor: '#a50000', color: 'white', textAlign: 'center'}}>0.5x</td>
    }
    if(typeNum === 1){
        return <td className='typeDmgMult' style={{textAlign: 'center'}}>1x</td>
    }
    if(typeNum === 2){
        return <td className='typeDmgMult' style={{backgroundColor: '#4e9805', textAlign: 'center'}}>2x</td>
    }
    if(typeNum === 4){
        return <td className='typeDmgMult' style={{backgroundColor: '#73d212', textAlign: 'center'}}>4x</td>
    }
}
function whichTypeIndex(type){
    if(type==='grass'){
        return(4);
    }
    if(type==='poison'){
        return(7);
    }
    if(type==='bug'){
        return(11);
    }
    if(type==='dark'){
        return(15);
    }
    if(type==='dragon'){
        return(14);
    }
    if(type==='electric'){
        return(3);
    }
    if(type==='fairy'){
        return(17);
    }
    if(type==='fighting'){
        return(6);
    }
    if(type==='fire'){
        return(1);
    }
    if(type==='flying'){
        return(9);
    }
    if(type==='ghost'){
        return(13);
    }
    if(type==='ground'){
        return(8);
    }
    if(type==='ice'){
        return(5);
    }
    if(type==='normal'){
        return(0);
    }
    if(type==='psychic'){
        return(10);
    }
    if(type==='rock'){
        return(12);
    }
    if(type==='steel'){
        return(16);
    }
    if(type==='water'){
        return(2);
    }
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

export default TypeChart;