import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useFetch from '../Hooks/Pokeapi';
import { Grid } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';

export function PokeList() {

    const [pokemons, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit=9');

return (
    <Grid container spacing={4} className='poke-cards'>
        {pokemons.map((pokemon, index) => (
        <Grid item xs={8} sm={6} md={4} lg={2} key={index}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
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
);

}