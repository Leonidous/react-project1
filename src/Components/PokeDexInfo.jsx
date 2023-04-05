import Table from 'react-bootstrap/Table';
import useArrayFetch from '../Hooks/PokeArrayApi';
import useFetch from '../Hooks/Pokeapi';
import '../App.css'

function PokeDexInfoTable(PokeInfo) {
    let PokemonInfo = PokeInfo.PokeInfo;
    let abilityEndpoints = [];

    if(!(Object.keys(PokemonInfo).length === 0)){
        PokemonInfo.abilities.map((abObj) => 
        abilityEndpoints.push(abObj.ability.url)
        )
    }

    const [abilityInfo] = useArrayFetch(abilityEndpoints);
    const [speciesInfo] = useFetch(PokemonInfo.species.url);

    return (
        <div className='pokeDexInfoContainer'>
        <div>Pokédex Data</div>
        <Table striped bordered hover className='pokeDexInfo'>
            <thead>
            </thead>
            <tbody>
                <tr>
                    <td>National №</td>
                    <td>{PokemonInfo.id}</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>
                        <div id='TypeList'>
                            {PokemonInfo.types.map((typelist) => (
                                <div className='pokeTypeImg' key={typelist.type.name}><img src={PokeType(typelist.type.name)} alt='Type' className='TypeDex'/><div className='pokeTypeName'>{typelist.type.name}</div></div>
                            ))}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Genus</td>
                    <td>{getGenusTextLanguage('en', speciesInfo.genera)}</td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>{((PokemonInfo.height)*0.1)+ ' m'}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{((PokemonInfo.weight)*0.1)+ ' kg'}</td>
                </tr>
                <tr>
                    <td>Abilities</td>
                    <td>
                        <ul>
                            {abilityInfo.map((ability, key) => (
                                <li key={key}>{isHiddenAbility(ability.pokemon , PokemonInfo.name) + ability.name + ': '+getTextLanguage('en', ability.flavor_text_entries)}</li>
                            ))}
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Local №</td>
                    <td>{PokemonInfo.id}</td>
                </tr>
            </tbody>
        </Table>
        </div>
    );
}

/*
<div className='abilities-other-container'>
    <h3>Abilities</h3>
    <ul>
        {abilityInfo.map((ability, key) => (
            <li key={key}>{isHiddenAbility(ability.pokemon ,pokemoninfo.name) + ability.name + ': '+getFlavorTextLanguage('en', ability.flavor_text_entries)}</li>
        ))}
    </ul>
    <h3>Other Info</h3>
    <ul>
        <li>Height: {pokemoninfo.height}</li>
        <li>Weight: {pokemoninfo.weight}</li>
    </ul>
</div>
*/

function getTextLanguage(language, TextArray){
  
    let flavorText = '';

    for(let i in TextArray){
        if(TextArray[i].language.name === language){
        flavorText = TextArray[i].flavor_text;
        break;
        }
    }

    return (flavorText);
}

function getGenusTextLanguage(language, TextArray){
  
    let genusText = '';
    
    for(let i in TextArray){
        if(TextArray[i].language.name === language){
        genusText = TextArray[i].genus;
        break;
        }
    }

    return (genusText);
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

function isHiddenAbility (pokeAbilitiesArray, pokeName){

    let isHidden = false;

    pokeAbilitiesArray.map((abilityHaver) => {
        if(abilityHaver.pokemon.name === pokeName){
            isHidden = abilityHaver.is_hidden;
        }
    })

    if(isHidden){
        return('(Hidden Ability) ');
    }else{
        return '';
    }
}

export default PokeDexInfoTable;