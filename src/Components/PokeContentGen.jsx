import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import useFetch from '../Hooks/Pokeapi';
import fallbackimg from '../Images/FallbackImage.png'
import { useRef } from 'react';

export function PokeContent(page) {

    const onMediaFallback = event => event.target.src = fallbackimg;

    const CurrentPage = page.page;
    const PerPage = page.pokePerPage;

    const [pokemons, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit='+(PerPage)+'&offset='+(((CurrentPage)-1)*PerPage));

    if(pokemons.results){ console.log('pokecontentgen results');
      return (
        <>
          <Grid container spacing={4} className='poke-cards' sx={{paddingTop: 1, paddingBottom: 1}}>
            {pokemons.results.map((pokemon, index) => (
            <Grid item xs={8} sm={6} md={4} lg={2} key={index}>
                <Card sx={{ maxWidth: 345}}>
                    <CardMedia className='poke-image'
                        sx={{ 
                        backgroundSize: 'cover',
                        }}
                        component="img"
                        image= {PokeImage(pokemon.url)}
                        onError={onMediaFallback}
                        title={pokemon.name}
                    >
                    </CardMedia>
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
      );
    }
}

function PokeImage(ImageUrl) {

  const id = ImageUrl;

  const parts = ImageUrl.split("/");
  const result = parts[parts.length - 2];

  const Image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ result +'.png';

  return Image;
}
