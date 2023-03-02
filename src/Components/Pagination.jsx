import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../Themes/theme";
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import useFetch from '../Hooks/Pokeapi';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {PokeList} from './PokeList';

export function PokePager() {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };

      return (
        <>
          <Stack>
            <Typography>{page}</Typography>
            <ThemeProvider theme={myTheme}>
                <Pagination count={54} page={page} onChange={handleChange} size='large' sx={{mx:'auto', padding: 1}} color='primary'/>
            </ThemeProvider>
          </Stack>
  
          <PokeList page={page}/>
        </>
      );
}