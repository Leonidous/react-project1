import * as React from 'react';
import { useState } from 'react';
import useFetch from '../Hooks/Pokeapi';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export function PokeSearcher (){

    const {search} =  useParams();

    const [searchData, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');

    console.log(search);

    return(
        <>
            <Link to={'/'}>
                <Button size="small">Go Back</Button>
            </Link>
        </>
    )

}