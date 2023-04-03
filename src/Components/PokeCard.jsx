import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';
import useArrayFetch from '../Hooks/PokeArrayApi';
import PokeChart from './PokeStatChart';
import PokeImgCarousel from './PokeImgCarousel';
import MovesTable from './MovesTable';
import TypeChart from './TypeDefences';
import '../App.css'

export function PokeCard() {
    const {pokemon} =  useParams();
    const [pokemoninfo, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);

    let moveEndpoints = [];
    let abilityEndpoints = [];
    let typeEndpoints = [];

    if(pokemoninfo?.moves && pokemoninfo.moves.length > 0){
        pokemoninfo.moves.map((moveObj) => 
        moveEndpoints.push(moveObj.move.url)
        )
        pokemoninfo.abilities.map((abObj) => 
        abilityEndpoints.push(abObj.ability.url)
        )
        pokemoninfo.types.map((typeObj) => 
        typeEndpoints.push(typeObj.type.url)
        )
    }

    const [abilityInfo] = useArrayFetch(abilityEndpoints);
    const [MovesInfo] = useArrayFetch(moveEndpoints);
    const [typeInfo] = useArrayFetch(typeEndpoints);

    let pokeStats = {
        labels: '',
        datasets: [],
    }

    const pokeColors = ['#e4000f','#f08030','#f8d030','#6890f0','#78c850','#f85888'];
    const pokeBorderColors = ['#a60000','#9c531f','#a1871f','#445e9c','#4e8234','#a13959']

    let statLabels = [];

    if(!(Object.keys(pokemoninfo).length === 0)){
        for(let i in pokemoninfo.stats){
            statLabels[i]=(pokemoninfo.stats[i].stat.name+' ('+pokemoninfo.stats[i].base_stat+')');
        }

        pokeStats = {
            labels: (statLabels.map((statLabel) => statLabel)),
            datasets: [
                {
                data: pokemoninfo.stats.map((statlist) => statlist.base_stat),
                backgroundColor: pokeColors.map((color) => color),
                borderColor: pokeBorderColors.map((color) => color),
                },
            ],
        };
    }

    if(!(Object.keys(pokemoninfo).length === 0)){
        console.log(abilityInfo);
        return (
            <>
                <h1 className='PokeCardTitle'>{pokemoninfo.name}</h1>
                <div id='pokecard-grid'>
                    <div className='pokeGridItem-1'>
                        <PokeImgCarousel 
                            normal={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemoninfo.id+'.png'} 
                            shiny={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+pokemoninfo.id+'.png'}
                        />
                    </div>
                    <div className='pokeGridItem-2'>
                        <PokeChart stats={pokeStats}/>
                    </div>
                    <div className='pokeGridItem-3'>
                        <h3 style={{textAlign: 'center'}}>Type(s)</h3>
                        <div id='TypeList'>
                            {pokemoninfo.types.map((typelist) => (
                                <div className='pokeTypeImg' key={typelist.type.name}><img src={PokeType(typelist.type.name)} alt='Type'/><div className='pokeTypeName'>{typelist.type.name}</div></div>
                            ))}
                        </div>
                    </div>
                    <div className='pokeGridItem-4'>
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
                    </div>
                    <div className='pokeGridItem-5'>
                        <MovesTable Movelist={MovesInfo}/>
                    </div>
                    <div className='pokeGridItem-6'>
                        <TypeChart types={typeInfo}/>
                    </div>
                </div>
            </>
        )
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

function getFlavorTextLanguage(language, flavorTextArray){
  
    let flavorText = '';
  
    for(let i in flavorTextArray){
      if(flavorTextArray[i].language.name === language){
        flavorText = flavorTextArray[i].flavor_text;
        break;
      }
    }
  
    return (flavorText);
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

    /*What to add:
    -Pokemon Sprites (maybe be able to cycle through all of them?)
    -Graph of pokemon stats (DONE)
    -Moves (in collapsible/scrollable list, will also show flavor text and what version learned in) (DONE)
    -Types with little type icons (DONE)
    -Add type defenses (DONE)
    -add egg groups
    -add pokemon flavor text
    -add evolutions
    -add hidden ability
    -add ability flavor text (DONE)
    -add generational learnset
    */
}