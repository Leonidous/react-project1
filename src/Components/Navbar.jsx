import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../Themes/theme";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function SearchAppBar() {

  const [value, setValue] = useState("");

  const handleTextInputChange = e => {
    setValue(e.target.value);
  }

  return (
        <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={myTheme}>
          <AppBar position="static">
              <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Pokédex
                </Typography>
                <Search>
                  <Link to={'/Search/' + value} style={{color:'#FFFFFF'}}>
                    <IconButton sx={{
                      height: '100%',
                      color: 'inherit',
                      position: 'absolute',
                      pointerEvents: 'auto',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: '1',
                    }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Link>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleTextInputChange}
                    value={value}
                  />
                </Search>
              </Toolbar>
          </AppBar>
        </ThemeProvider>
        </Box>
  );
}