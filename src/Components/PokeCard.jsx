import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';
import useArrayFetch from '../Hooks/PokeArrayApi';
import PokeImgCarousel from './PokeImgCarousel';
import MovesTable from './MovesTable';
import TypeChart from './TypeDefences';
import PokeDexInfoTable from './PokeDexInfo';
import PokeChart2 from './PokeChart2';
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
                        <div className='pokeDataContainer'>
                            <PokeImgCarousel 
                                normal={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemoninfo.id+'.png'} 
                                shiny={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+pokemoninfo.id+'.png'}
                            />
                            <PokeDexInfoTable PokeInfo = {pokemoninfo}/>
                        </div>
                    </div>
                    <div className='pokeGridItem-5'>
                        <PokeChart2 stats={pokemoninfo.stats}/>
                    </div>
                    <div className='pokeGridItem-3'>
                        <MovesTable Movelist={MovesInfo}/>
                    </div>
                    <div className='pokeGridItem-4'>
                        <TypeChart types={typeInfo}/>
                    </div>
                </div>
            </>
        )
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