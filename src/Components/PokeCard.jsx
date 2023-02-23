import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';

export function PokeCard() {

    const {pokemon} =  useParams()

    const [pokemoninfo, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);

    if(!(Object.keys(pokemoninfo).length == 0)){
        return (
            <>
                <h1>{pokemoninfo.name}</h1>
                <h3>Type(s)</h3>
                <ul>
                    {pokemoninfo.types.map((typelist, key) => (
                        <li>{typelist.type.name}</li>
                    ))}
                </ul>
                <h3>Abilities</h3>
                <ul>
                    {pokemoninfo.abilities.map((abilitylist, key) => (
                        <li>{abilitylist.ability.name}</li>
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

}