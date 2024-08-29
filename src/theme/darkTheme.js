import { createTheme } from "@mui/material/styles";
import { teal, green } from "@mui/material/colors";

const darkTheme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
      color:"white" ,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.00833em",
      color: teal[200],
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: "white",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "0.00735em",
      color: "#fff",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: "#fff",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
      letterSpacing: "0.00938em",
      color: "#fff",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.00938em",
      color: "#fff",
    },
    body2: {
      fontSize: "0.675rem",
      fontWeight: 400,
      letterSpacing: "0.01071em",
      color: "#fff",
    },
  },
  palette: {
    primary: {
      main: '#E32D69',
    },
    secondary: {
      main:  '#E32D69',
    },
    text: {
      primary: "#fff",
    },
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
      box: "#1e1e1e",
    },
    error: {
      main: "#ff0000",
    },
    gradients: {
      dark: 'linear-gradient(to right, #D32F2F, #9A0036)',
      light: 'linear-gradient(to right, #FA4B37, #DF2771)',
    },
    navbar: "#1e1e1e",  // Add this line
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
          color: teal[300],
        },
        containedSecondary: {
          backgroundColor: "#008579",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#008579",
          },
        },
        error: {
          main: "#f44336",
          light: "#fce4ec",
          dark: "#c62828",
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
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
        root: {},
      },
    },
  },
});

export default darkTheme;
