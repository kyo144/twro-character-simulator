import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "'Inter', 'Noto Sans TC', 'Zen Kaku Gothic New', 'sans-serif'",
  },
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
      styleOverrides: () => `
        a: {
          textDecoration: 'none',
          display: 'block',
        }
      `,
    },
  },
});

export default theme;
