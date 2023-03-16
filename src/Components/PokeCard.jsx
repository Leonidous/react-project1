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

    const pokeColors = ['#e4000f','#f08030','#f8d030','#6890f0','#78c850','#f85888'];
    const pokeBorderColors = ['#a60000','#9c531f','#a1871f','#445e9c','#4e8234','#a13959']

    if(!(Object.keys(pokemoninfo).length==0)){
        console.log(pokemoninfo.stats.map((statlist) => statlist.stat.name)+' ('+pokemoninfo.stats.map((statlist) => statlist.base_stat)+')');

        
    }

    if(!(Object.keys(pokemoninfo).length == 0)){
        pokeStats = {
            labels: (pokemoninfo.stats.map((statlist) => statlist.stat.name)),
            datasets: [
                {
                data: pokemoninfo.stats.map((statlist) => statlist.base_stat),
                backgroundColor: pokeColors.map((color) => color),
                borderColor: pokeBorderColors.map((color) => color),
                },
            ],
        };
    }
    

    const onMediaFallback = event => event.target.src = fallbackimg;

    if(!(Object.keys(pokemoninfo).length == 0)){
        return (
            <>
                <h1 className='PokeCardTitle'>{pokemoninfo.name}</h1>
                <div id='pokecard-grid'>
                    <div className='pokeGridItem'>
                        <Carousel autoPlay={false}>
                            <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemoninfo.id+'.png'} onError={onMediaFallback} style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center"}}></img>
                            <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+pokemoninfo.id+'.png'} onError={onMediaFallback} style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center"}}></img>
                        </Carousel>
                    </div>
                    <div className='pokeGridItem'>
                        <PokeChart stats={pokeStats}/>
                    </div>
                    <div className='pokeGridItem'>
                        <h3>Type(s)</h3>
                        <ul>
                            {pokemoninfo.types.map((typelist, key) => (
                                <li key={key}>{typelist.type.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='pokeGridItem'>
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
                </div>
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