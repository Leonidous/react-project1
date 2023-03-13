import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';
import fallbackimg from '../Images/FallbackImage.png'
import PokeChart from './PokeStatChart';
import { useState } from 'react';

export function PokeCard() {

    const {pokemon} =  useParams();
    const [pokemoninfo, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);

    const [pokeStats, setPokeStats] = useState({
        labels: '',
        datasets: [],
    });

    /* WORK IN PROGRESS
    if(!(Object.keys(pokemoninfo).length == 0)){
        setPokeStats({
            labels: pokemoninfo.stats.map((statlist) => statlist.stat.name),
            datasets: [
                {
                label: pokemoninfo.stats.map((statlist) => statlist.stat.name),
                data: pokemoninfo.stats.map((statlist) => statlist.base_stat)
                },
            ],
        })
    }
    */

    const onMediaFallback = event => event.target.src = fallbackimg;

    if(!(Object.keys(pokemoninfo).length == 0)){
        return (
            <>
                <h1>{pokemoninfo.name}</h1>
                <div>
                    <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemoninfo.id+'.png'} onError={onMediaFallback}></img>
                    <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+pokemoninfo.id+'.png'} onError={onMediaFallback}></img>
                </div>
                <div>
                    {/*<PokeChart stats={pokeStats}/>*/}
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