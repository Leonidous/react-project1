import * as React from 'react';
import '../App.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useFetch from '../Hooks/Pokeapi';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export function PokeList(page) {
    
    const [pokemons, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit=24&offset='+(((page.page)-1)*24));

    if(pokemons.results){
        return(
        <>
            <Grid container spacing={4} className='poke-cards' sx={{paddingTop: 1, paddingBottom: 1}}>
                {pokemons.results.map((pokemon, index) => (
                <Grid item xs={8} sm={6} md={4} lg={2} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia className='poke-image'
                            sx={{ 
                            height: 325,
                            backgroundSize: 'contain',
                            }}
                            image= {'https://img.pokemondb.net/artwork/large/' + pokemon.name + '.jpg'}
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

}