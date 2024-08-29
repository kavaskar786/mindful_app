import { createTheme } from "@mui/material/styles";
import { teal, green } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
      color: '#E32D69',
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.00833em",
      color: '#E32D69',
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: '#E32D69',
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "0.00735em",
      color: '#000000',
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: '#000000',
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
      letterSpacing: "0.00938em",
      color: '#E32D69',
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.00938em",
      color: "#333",
    },
    body2: {
      fontSize: "0.675rem",
      fontWeight: 400,
      letterSpacing: "0.01071em",
      color: "#333",
    },
  },
  palette: {
    primary: {
      main: '#E32D69',
    },
    secondary: {
      main: '#DF2771',
    },
    text: {
      primary: "#333",
    },
    mode: "light",
    background: {
      default: "#f0f2f#",
      // paper: '#E4CED0',
      paper: "#fff",
      box: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#fce4ec",
      // light: "#fff",
      dark: "#c62828",
    },
    gradients: {
      dark: 'linear-gradient(to right, #D32F2F, #9A0036)',
      light: 'linear-gradient(to right, #FA4B37, #DF2771)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "",
          },
        },
        textPrimary: {
          color: teal[500],
        },
        containedSecondary: {
          backgroundColor: "#008579",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#008579",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {},
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          // Custom styles for MenuItem
        },
      },
    },
  },
});

export default theme;
