import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';

export function PokeCard() {

    const {pokemon} =  useParams()

    const [pokemons, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);

    return <h1>Pokemon {pokemon}</h1>

}