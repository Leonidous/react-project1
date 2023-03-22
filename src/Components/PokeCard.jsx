import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';
import PokeChart from './PokeStatChart';
import PokeImgCarousel from './PokeImgCarousel';
import MovesTable from './MovesTable';
import '../App.css'

export function PokeCard() {

    const {pokemon} =  useParams();
    const [pokemoninfo, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);

    let pokeStats = {
        labels: '',
        datasets: [],
    }

    const pokeColors = ['#e4000f','#f08030','#f8d030','#6890f0','#78c850','#f85888'];
    const pokeBorderColors = ['#a60000','#9c531f','#a1871f','#445e9c','#4e8234','#a13959']

    let statLabels = [];
    let pokeMoveNames = [];
    let pokeMoveUrl = [];

    if(!(Object.keys(pokemoninfo).length==0)){
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

        for(let i in pokemoninfo.moves){
            pokeMoveNames[i] = pokemoninfo.moves[i].move.name;
            pokeMoveUrl[i] = pokemoninfo.moves[i].move.url;
        }
    }

    console.log(pokeMoveNames);
    console.log(pokeMoveUrl);

    if(!(Object.keys(pokemoninfo).length == 0)){
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
                                <div className='pokeTypeImg'><img src={PokeType(typelist.type.name)}/><div className='pokeTypeName'>{typelist.type.name}</div></div>
                            ))}
                        </div>
                    </div>
                    <div className='pokeGridItem-4'>
                        <h3>Abilities</h3>
                        <ul>
                            {pokemoninfo.abilities.map((abilitylist, key) => (
                                <li key={key}>{abilitylist.ability.name}</li>
                            ))}
                        </ul>
                        <h3>Other Info</h3>
                        <ul>
                            <li>Height: {pokemoninfo.height}</li>
                            <li>Weight: {pokemoninfo.weight}</li>
                        </ul>
                    </div>
                    <div className='pokeGridItem-5'>
                        <MovesTable />
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
    if(type=='fighting'){
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


    /*What to add:
    -Pokemon Sprites (maybe be able to cycle through all of them?)
    -Graph of pokemon stats
    -Moves (in collapsible/scrollable list, will also show flavor text and what version learned in)
    -Types with little type icons
    */
}