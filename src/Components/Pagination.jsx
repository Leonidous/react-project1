import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../Themes/theme";

/*export function PokePager() {
  return (
    <Stack>
        <ThemeProvider theme={myTheme}>
            <Pagination count={10} color='primary' size="large" sx={{mx:'auto', padding: 1}} page={1} />
        </ThemeProvider>
    </Stack>
  );
}*/

export function PokePager() {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
  
    return (
      <Stack>
        <Typography>Page: {page}</Typography>
        <ThemeProvider theme={myTheme}>
            <Pagination count={10} page={page} onChange={handleChange} size='large' sx={{mx:'auto', padding: 1}} color='primary'/>
        </ThemeProvider>
      </Stack>
    );
}