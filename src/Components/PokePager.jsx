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
import { createBrowserHistory } from '@remix-run/router';
import { useEffect } from 'react';
import qs from 'qs';


export function PokePager() {

    const [page, setPage] = React.useState(1);
    const [perPage, setperPage] = React.useState(24);
    const handleChange = (event, value) => {
      return setPage(value);
    };

    //Preserve page state using browser history VVVVVVV
    const history = createBrowserHistory();

    useEffect(() => {
      const filterParams = history.location.search.substr(1);
      const filtersFromParams = qs.parse(filterParams);
      if (filtersFromParams.page) {
        setPage(Number(filtersFromParams.page));
      }
    }, []);

    useEffect(() => {
      history.push(`?page=${page}`);
    }, [page]);
    //Preserve page state using browser history ^^^^^

    //Preserve perPage state using local storage VVVVVV
    useEffect(() => {
      setperPage(JSON.parse(window.localStorage.getItem('perPage')));
    }, []);
  
    useEffect(() => {
      window.localStorage.setItem('perPage', perPage);
    }, [perPage]);
    //Preserve page state using browser history ^^^^^

    const handleClose = e => {
      setAnchorEl(null);
      if(!((e.target.value)===undefined)){
        setperPage(e.target.value);
      }
    };

    const [pageCheck, isLoading, isError] = useFetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');

    const pages = (Math.ceil((pageCheck.count)/(perPage)));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      return setAnchorEl(event.currentTarget);
    };

    if(page>pages){
      setPage(pages);
    }

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