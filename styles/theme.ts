import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#688FF4',
    },
    secondary: {
      main: '#283593',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
          display: 'block',
        },
      },
    },
  },
});

export default theme;
