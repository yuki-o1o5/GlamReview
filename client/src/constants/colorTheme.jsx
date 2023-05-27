import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Playfair Display", serif',
  },
  palette: {
    primary: {
      light: "rgba(255,255,255,0.85)",
      main: "#282d2c",
    },
    secondary: {
      main: "#f3f4f2",
      //light grey
    },

    custom: {
      dark: "#0E3158",
      //dark blue
      main: "#016687",
      //  blue
      light: "#BBBDD3",
      // white blue
    },
  },
});
