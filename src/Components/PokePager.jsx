import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../Themes/theme";
import useFetch from '../Hooks/Pokeapi';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { PokeContent } from './PokeContentGen';

export function PokePager() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = e => {
      setAnchorEl(null);
      if(!((e.target.value)===undefined)){
        setperPage(e.target.value);
      }
    };

    const [page, setPage] = React.useState(1);
    const [perPage, setperPage] = React.useState(24);
    const handleChange = (event, value) => {
      setPage(value);
      console.log(value);
    };

    const [pageCheck, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');

    const pages = (Math.ceil((pageCheck.count)/(perPage)));

    if(pageCheck.count){
      return (
        <>
          <Stack>
            <div style={{margin: 'auto'}}>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Select Pokemon Per Page
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose} value={24}>24</MenuItem>
                <MenuItem onClick={handleClose} value={48}>48</MenuItem>
                <MenuItem onClick={handleClose} value={72}>72</MenuItem>
              </Menu>
            </div>

            <ThemeProvider theme={myTheme}>
              <Pagination count={pages} page={page} onChange={handleChange} size='large' sx={{mx:'auto', padding: 1}} color='primary'/>
            </ThemeProvider>
          </Stack>

          <PokeContent page={page} pokePerPage={perPage}/>
        </>
      );
    }
}