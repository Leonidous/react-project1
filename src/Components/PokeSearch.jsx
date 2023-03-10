import * as React from 'react';
import { useState } from 'react';
import useFetch from '../Hooks/Pokeapi';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export function PokeSearcher (){

    const {search} =  useParams();
    const [searchData, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const  pokeSearchResults = [];
    
    for(let i in searchData.results){
        if((searchData.results[i].name).toLowerCase().includes(search.toLowerCase())){
            pokeSearchResults.push({name: searchData.results[i].name, url: searchData.results[i].url});
        }
    }

    return(
        <>
            <h1 style={{textAlign: 'center'}}>Search Results for: '{search}'</h1>

            <Grid container spacing={4} className='poke-cards' sx={{paddingTop: 1, paddingBottom: 1}}>
            {pokeSearchResults.map((pokemon, index) => (
            <Grid item xs={8} sm={6} md={4} lg={2} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia className='poke-image'
                        sx={{ 
                        height: 325,
                        backgroundSize: 'contain',
                        }}
                        image= {'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+(Imageid(pokemon.url))+'.png'}
                        title={pokemon.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {pokemon.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={'/' + pokemon.name}>
                            <Button size="small">Learn More</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            ))}
          </Grid>
        </>
    )

}

function Imageid(ImageUrl) {

    const id = ImageUrl;
  
    const parts = ImageUrl.split("/");
    const result = parts[parts.length - 2];
    
    return result;
  }