import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';
import fallbackimg from '../Images/FallbackImage.png'
import PokeChart from './PokeStatChart';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import '../App.css'

export function PokeCard() {

    const {pokemon} =  useParams();
    const [pokemoninfo, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);
    
    let pokeStats = {
        labels: '',
        datasets: [],
    }

    if(!(Object.keys(pokemoninfo).length == 0)){
        pokeStats = {
            labels: pokemoninfo.stats.map((statlist) => statlist.stat.name),
            datasets: [
                {
                data: pokemoninfo.stats.map((statlist) => statlist.base_stat),
                },
            ],
        };
    }
    

    const onMediaFallback = event => event.target.src = fallbackimg;

    if(!(Object.keys(pokemoninfo).length == 0)){
        return (
            <>
                <h1>{pokemoninfo.name}</h1>
                <div id='pokecard1'>
                    <Carousel sx={{overflow: 'visible', position: 'sticky'}}>
                        <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemoninfo.id+'.png'} onError={onMediaFallback}></img>
                        <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+pokemoninfo.id+'.png'} onError={onMediaFallback}></img>
                    </Carousel>
                    <div>
                        <PokeChart stats={pokeStats}/>
                    </div>
                </div>
                <h3>Type(s)</h3>
                <ul>
                    {pokemoninfo.types.map((typelist, key) => (
                        <li key={key}>{typelist.type.name}</li>
                    ))}
                </ul>
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
            </>
        )
    }

    /*What to add:
    -Pokemon Sprites (maybe be able to cycle through all of them?)
    -Graph of pokemon stats
    -Moves (in collapsible/scrollable list, will also show flavor text and what version learned in)
    -
    */
}